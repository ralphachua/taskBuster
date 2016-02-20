
var moment = require("moment");

module.exports = {

  create: function(req, res) {

    if (!req.param("projectName")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Project name required"));
      return res.badRequest(payload);
    }

    var params = {
      projectName:  req.param("projectName"),
      createdBy:    req.param("userId"), //req.user
      dueDate:      Date(req.param("dueDate")),
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
        console.log(err)
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
      project: function(next) {
        Project.findOne({ id: req.param("projectId") }, function(err, project) {
          if (_.isEmpty(project)) {
            var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("Project does not exist"));
            return res.notFound(payload);
          }
          return next(err, project);
        });
      },
      tasksTodo: function(next) {
        Task.count({
          projectId: req.param("projectId"),
          status: "TODO"
        }, function(err, count) {
          return next(err, count);
        });
      },
      tasksOngoing: function(next) {
        Task.count({
          projectId: req.param("projectId"),
          status: "ONGOING"
        }, function(err, count) {
          return next(err, count);
        });
      },
      tasksDone: function(next) {
        Task.count({
          projectId: req.param("projectId"),
          status: "DONE"
        }, function(err, count) {
          return next(err, count);
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
          projectName:  result.project.projectName,
          dueDate:      result.project.dueDate,
          tasksTodo:    result.tasksTodo,
          tasksOngoing: result.tasksOngoing,
          tasksDone:    result.tasksDone
        }
        payload = ApiService.toSuccessJSON(data);
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

    if (req.param("status") === "ACTIVE") {
      params.startedOn = moment().utc(new Date).format();
    } else if (req.param("status") === "DONE") {
      params.finishedOn = moment().utc(new Date).format();
    }

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