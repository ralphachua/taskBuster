
var moment = require("moment");

module.exports = {

  create: function(req, res) {

    if (!req.param("taskName")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Name Required."));
      return res.badRequest(payload);
    }

    if (!req.param("taskDescription")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Description Required."));
      return res.badRequest(payload);
    }

    if (!req.param("taskPoints")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Task Points Required."));
      return res.badRequest(payload);
    }

    if (!req.param("assignedTo")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Assignee Required."));
      return res.badRequest(payload);
    }

    if (!req.param("projectId")) {
      var payload = ApiService.toErrorJSON(new Errors.InvalidArgumentError("Project Required."));
      return res.badRequest(payload);
    }

    var params = {
      taskName:              req.param("taskName"),
      taskDescription:       req.param("taskDescription"),
      assignedTo:            req.param("assignedTo"),
      taskPoints:            req.param("taskPoints"),
      projectId:             req.param("projectId")
    };

    var tasks = {
      save: function(next) {
        Task.create(params, function(err, user) {
          return next(err, user);
        });
      }
    };

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
    var taskStatus = req.param("taskStatus") || "";
    if (!taskStatus) {
      return res.badRequest(ApiService.toErrorJSON(
        new Errors.InvalidArgumentError("Missing taskStatus parameter.")));
    }

    var tasks = {
      find: function(next) {
        Task.findOne({id: req.param("taskId")}, function(err, task) {
          if (_.isEmpty(task)) {
            var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("Task does not exist"));
            return res.notFound(payload);
          }
          return next(err, task);
        });
      },
      updateRecord: ["find", function(next, cres) {
        var paramsToUpdate = {
          status: taskStatus
        }

        if (taskStatus == "DONE") {
          var doneAt = req.param("doneAt") || moment().toString();
          paramsToUpdate.doneAt = doneAt;
          UserService.taskDone(cres.find, function(err, result){
            console.log("success updating badges")
            console.log(result)
          })
        }
        Task.update({id: req.param("taskId")},paramsToUpdate, function(err, task) {
          return next(err, task);
        });
      }]
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if(err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload)
      } else {
        payload = ApiService.toSuccessJSON(result.updateRecord)
        return res.json(payload)
      }
    });
  }
}
