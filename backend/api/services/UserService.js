
module.exports = {

  generateUserJson: function(userId,callBack) {
  	var tasks = {
      user: function(next) {
        var params = {
          userId: userId
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
      }]
    }

    async.auto(tasks, function(err, result) {
      if (err) {
      	console.log("Error Generating User JSON")
      	return new Errors.UnknownError()
      } else if (_.isEmpty(result.user)) {
      	console.log("User does not exist")
        return new Errors.RecordNotFound();
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
          totalPointsDone: result.user.totalPointsDone
        };
        if (typeof callBack === "function") {
    		callBack(data)
		}
        return data
      }
    });
  }
}