
module.exports = {

  create: function(req, res) {

    if (!req.param("name")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Name required"));
      return res.badRequest(payload);
    }

    if (!req.param("gender")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Gender required"));
      return res.badRequest(payload);
    }

    if (!req.param("userId")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("User ID required"));
      return res.badRequest(payload);
    }

    var params = {
      name:         req.param("name"),
      gender:       req.param("gender"),
      userId:       req.param("userId"),
      avatarUrl:    "/avatar/123",
      levelId:      "abc123",
      activeBadge:  "qwe098",
      badges:       ["qwe098"]
    }

    var tasks = {
      save: function(next) {
        User.create(params, function(err, user) {
          return next(err, user);
        });
      }
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        payload = ApiService.toSuccessJSON(result.save);
        return res.json(payload);
      }
    });
  },

  show: function(req, res) {
    var tasks = {
      user: function(next) {
        var params = {
          userId: req.param("user_id")
        }
        User.findOne(params, function(err, user) {
          if (_.isEmpty(user)) {
            var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("User does not exist"));
            return res.notFound(payload);
          }
          return next(err, user);
        });
      },
      level: ["user", function(next, cres) {
        var params = {
          levelId: cres.user.levelId
        }
        Level.find(params, function(err, level) {
          console.log(level)
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
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        var data = {
          name:       result.user.name,
          gender:     result.user.gender,
          avatar_url:  result.user.avatarUrl,
          level: {
            name:            result.level.levelName,
            current_points:  result.user.totalPointsDone - result.level.accumulatedPoints,
            required_points: result.level.requiredPoints
          },
          active_badge: {
            badge_url:  result.badge.badgeUrl,
            badge_name: result.badge.badgeName
          }
        };
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  }
}