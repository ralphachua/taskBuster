
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

      level: ["user", function(next, cres) {
        var params = {
          levelId: cres.user.levelId
        }
        Level.findOne(params, function(err, level) {
          return next(err, level);
        });
      }],

      badge: function(next) {
        Badge.find({}, function(err, badges) {
          return next(err, badges);
        });
      },

      task: ["user", function(next,cres) {
        var params = {
          projectId: task.projectId,
          assignedTo: cres.user.id,
          status: "DONE"
        }
        
        Task.count(params, function(err, count) {
          return next(err, count);
        });
      }],

      updateUser: ["user", "level", "badge", "task", function(next, cres) {
        var user = cres.user;
        var level = cres.level;
        var badges = cres.badge;
        var taskCount = cres.task;

        var totalPointsDone = user.totalPointsDone + task.taskPoints
        var requiredPoints = level.requiredPoints;
        var currentPoints =  totalPointsDone - level.accumulatedPoints;

        var params = {
          totalPointsDone: totalPointsDone
        }

        if (currentPoints >= requiredPoints) {
          params.levelId = cres.user.levelId + 1;
        }

        var badges =  _.clone(user.badges);

        if (taskCount == 1) {
          badges.push("asd765");
          params.badges = _.uniq(badges);
        }

        if (totalPointsDone == 100) {
          badges.push("zxc123");
          params.badges = _.uniq(badges);
        }

        User.update({ id: task.assignedTo }, params, function(err, user) {
          return next(err, user);
        })
      }],
    }

    async.auto(tasks, function(err, result){
      if (err) {
        callback(err)
      } else {
        var data = {
          updatedUser: result.updateUser,
          updatedBadges: result.checkForBadges
        }
        callback(null, data)
      }
    })
  }
}