
module.exports = {

  create: function(req, res) {

    if (!req.param("projectName")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Missing projectName Parameter."));
      return res.badRequest(payload);
    }

    var params = {
      projectName:  req.param("projectName"),
      createdBy:    req.param("userId"), //req.user
      dueDate:      req.param("dueDate"),
      members:      req.param("members")
    };

    var tasks = {
      save: function(next) {
        Project.create(params, function(err, project) {
          return next(err, project);
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

  update: function(req, res) {
    var params = {
      projectName: req.param("projectName"),
      members: req.param("members"),
      dueDate: req.param("dueDate"),
      status: req.param("status")
    };

    var tasks = {
      find: function(next) {
        Project.findOne({id: req.param("projectId")}, function(err, project) {
          if (_.isEmpty(project)) {
            var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("Project does not exist"));
            return res.notFound(payload);
          }
          return next(err, project);
        });
      },
      save: ["find", function(next) {
        Project.update({id: req.param("projectId")}, params, function(err, project) {
          return next(err, project);
        });
      }]
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
  }
}