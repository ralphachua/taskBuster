
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
    UserService.generateUserJson(req.param(user_id), function(result){
      var payload = null
      if (result = Errors.UnknownError()) {
        payload = ApiService.toErrorJSON(result)
        return res.serverError(payload)
      } else if (result = Errors.RecordNotFound()) {
        payload = ApiService.toErrorJSON(result)
        return res.serverError(payload)

      } else {
        payload = ApiService.toSuccessJSON(result)
        return res.json(payload)
      }
    })
  }
}