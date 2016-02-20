
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

    if (!req.param("socialId")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Social ID required"));
      return res.badRequest(payload);
    }

    var params = {
      name:         req.param("name"),
      gender:       req.param("gender"),
      socialId:       req.param("socialId"),
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
    UserService.generateUserJson(req.param("userId"), function(err, result){
      var payload = null
      if (err) {
        payload = ApiService.toErrorJSON(err)
        return res.serverError(payload)
      } else {
        payload = ApiService.toSuccessJSON(result)
        return res.json(payload)
      }
    })
  },

  showTasks: function(req, res) {
    var tasks = {
      tasksTodo: function(next) {
        Task.find({ 
          assignedTo: req.param("userId"),
          status: "TODO"
        }, function(err, todo) {
          return next(err, todo);
        });
      },
      tasksOngoing: function(next) {
        Task.find({ 
          assignedTo: req.param("userId"),
          status: "ONGOING"
        }, function(err, ongoing) {
          return next(err, ongoing);
        });
      },
      tasksDone: function(next) {
        Task.find({ 
          assignedTo: req.param("userId"),
          status: "DONE"
        }, function(err, done) {
          return next(err, done);
        });
      }
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        var data = {
          todo:   result.tasksTodo,
          ongoing:result.tasksOngoing,
          done:   result.tasksDone
        }
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  }
}