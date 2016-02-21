module.exports = {

  create: function(req, res) {

    if (!req.param("badgeName")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Badge name required"));
      return res.badRequest(payload);
    }

    var params = {
      badgeName:  req.param("badgeName"),
      badgeUrl:    req.param("badgeUrl"), 
      requiredPoints:      req.param("requiredPoints"),
    };

    var tasks = {
      save: function(next) {
        Badge.create(params, function(err, badge) {
          return next(err, badge);
        });
      }
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        sails.log.error(err);
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
      badge: function(next) {
        Badge.findOne({ id: req.param("badgeId") }, function(err, badge) {
          if (_.isEmpty(badge)) {
            var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("Badge does not exist"));
            return res.notFound(payload);
          }
          return next(err, badge);
        });
      }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        var data = {
          badgeId: result.badge.badgeId,
          badgeName: result.badge.badgeName,
          badgeUrl: result.badge.badgeUrl,
          requiredPoints: result.badge.requiredPoints
        }
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  },

  showAll: function(req, res){
    var payload = null;

    Badge.find().exec(function (err, badges){
    if (err) {
      payload = ApiService.toErrorJSON(new Errors.UnknownError());
      return res.serverError(payload);
    }
      payload = ApiService.toSuccessJSON(badges);
      return res.json(payload);
    });
  }
}
