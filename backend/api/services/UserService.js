
module.exports = {

  generateUserJson: function(userId,callback) {
  	var tasks = {
      user: function(next) {
        var params = {
          id: userId
        }
        User.findOne(params, function(err, user) {
            return next(err, user);
        });
      },
      level: ["user", function(next, cres) {
        var params = {
          levelId: cres.user.levelId
        }
        Level.findOne(params, function(err, level) {
          return next(err, level);
        });
      }],
      badge: ["user", function(next, cres) {
        var params = {
          badgeId: cres.user.activeBadge
        }
        Badge.findOne(params, function(err, badge) {
          return next(err, badge);
        });
      }],
      tasksTotal: function(next, cres) {
        var params = {
          assignedTo: userId
        }
        Task.count(params, function(err, count) {
          return next(err, count);
        });
      },
      tasksDone: function(next, cres) {
        var params = {
          assignedTo: userId,
          status: "DONE"
        }
        Task.count(params, function(err, count) {
          return next(err, count);
        });
      },
    }

    async.auto(tasks, function(err, result) {
      if (err) {
      	console.log("Error Generating User JSON")
      	return callback(new Errors.UnknownError());
      } else if (_.isEmpty(result.user)) {
      	console.log("User does not exist")
        return callback(new Errors.RecordNotFound());
      } else {
        var data = {
          name:       result.user.name,
          gender:     result.user.gender,
          avatarUrl:  result.user.avatarUrl,
          level: {
            name:            result.level.levelName,
            currentPoints:  result.user.totalPointsDone - result.level.accumulatedPoints,
            requiredPoints: result.level.requiredPoints
          },
          activeBadge: {
            badgeUrl:  result.badge.badgeUrl,
            badgeName: result.badge.badgeName
          },
          task: {
            done: result.tasksDone,
            total: result.tasksTotal
          },
          totalPointsDone: result.user.totalPointsDone
        };
        return callback(null, data);
      }
    });
  },

  taskDone: function(task, callback) {
    var tasks = {
      user: function(next) {
        var params = {
          id: task.assignedTo
        }
        User.findOne(params, function(err, user) { 
          return next(err, user);
        });
      },
      updateUser: ["user" ,function(next, cres) {
        var paramsToUpdate = {
            totalPointsDone = user.totalPointsDone + task.taskPoints
          }
          User.update(paramsToUpdate, function(err, user) {
            return next(err, user);
          })
      }],
      checkForBadges: ["updateUser", function(next, cres) {
        Badge.find({}, function(err, badges){
          var user = cres.updateUser
          badges.forEach(function(badge){
            if !(_.contains(user.badges, badge.badgeId)) {
              if (badge.requiredPoints <= user.totalPointsDone) {
                var paramsToUpdate = {
                  badges: user.badges.push(badge.badgeId)
                }
                User.update(paramsToUpdate, function(err, user) {
                  user = user
                  if (err) {
                    callback(err)
                  };
                })
              };
            };
            if (badge == badges[badges.length -1]) {
              return (null, user.badges)
            };
          })
        })
      }]
    }

    async.auto(tasks, function(err, result){
      if (err) {
        sails.log("error occurred")
        sails.log(err)
        callback(err)
      } else {
        var data = {
          updatedUser: result.updateUser,
          updatedBadges: result.checkForBadges
        }
        sails.log(data)
        callback(null, data)
      }
    })
  }
}