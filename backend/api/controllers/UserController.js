
module.exports = {

  create: function(req, res) {

    if (!req.param("name")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Missing name Parameter."));
      return res.badRequest(payload);
    }

    if (!req.param("gender")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Missing gender Parameter."));
      return res.badRequest(payload);
    }

    if (!req.param("userId")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Missing userId Parameter."));
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
    var generate = UserService.generateUserJson(req.param(user_id))
    var payload = null
    if (generate = Errors.UnknownError()) {
      payload = ApiService.toErrorJSON(generate)
      return res.serverError(payload)
    } else if (generate = Errors.RecordNotFound()) {
      payload = ApiService.toErrorJSON(generate)
      return res.serverError(payload)
    } else {
      payload = ApiService.toSuccessJSON(generate)
      return res.json(payload)
    }
  }
}