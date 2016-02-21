
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
      dueDate:      req.param("dueDate"),
      members:      req.param("members"),
      startedOn:  moment("2016-02-10", "YYYY-MM-DD").toString(),
      finishedOn: moment("2016-02-20", "YYYY-MM-DD").toString()
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
          status:       result.project.status,
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
  },

  listMembers: function(req, res) {
    var tasks = {
      project: function(next) {
        Project.findOne({ id: req.param("projectId") }, function(err, project) {
          return next(err, project);
        });
      },
      task: function(next) {
        Task.find({ projectId: req.param("projectId") }, function(err, task) {
          return next(err, task);
        });
      },
      badge: function(next) {
        Badge.find({}, function(err, badges) {
          return next(err, badges);
        });
      },
      user: ["project", function(next, cres) {
        var userIds = cres.project.members;
        User.find({ id: userIds }, function(err, users) {
          return next(err, users);
        });
      }]
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        var users = result.user;
        var badges = result.badge;
        var tasks = result.task;

        var data = _.map(users, function(user) {
          var activeBadge = _.find(badges, function(o) {
            return o.badgeId == user.activeBadge;
          });
          var todo = _.map(_.filter(tasks, function(o) {
            return o.assignedTo == user.id && o.status === "TODO";
          }), function(task) {
            return {
              taskId:           task.id,
              taskName:         task.taskName,
              taskDescription:  task.taskDescription,
              taskPoints:       task.taskPoints
            }
          });

          var ongoing = _.map(_.filter(tasks, function(o) {
            return o.assignedTo == user.id && o.status === "ONGOING";
          }), function(task) {
            return {
              taskId:           task.id,
              taskName:         task.taskName,
              taskDescription:  task.taskDescription,
              taskPoints:       task.taskPoints
            }
          });

          var done = _.map(_.filter(tasks, function(o) {
            return o.assignedTo == user.id && o.status === "DONE";
          }), function(task) {
            return {
              taskId:           task.id,
              taskName:         task.taskName,
              taskDescription:  task.taskDescription,
              taskPoints:       task.taskPoints
            }
          });

          return {
            name:   user.name,
            gender: user.gender,
            avatarUrl: user.avatarUrl,
            activeBadge: {
              badgeUrl: activeBadge.badgeUrl,
              badgeName: activeBadge.badgeName
            },
            task: {
              todo: todo,
              ongoing: ongoing,
              done: done
            }
          }
        });

        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  },

  getBurndown: function(req, res) {
    var projectId = req.param("projectId");

    var tasks = {
      "find": function(next) {
        Project.findOne({"id": projectId}, function(err, project) {
          return next(err, project);
        });
      },

      "getTasks": ["find", function(next, result) {
        Task.find({"projectId": projectId}, function(err, tasks) {
          return next(err, tasks);
        });
      }],

      "getProjectDuration": ["find", function(next, result) {
        var project = result.find;

        var startDate = project.createdAt;
        if (project.startedOn) {
          startDate = project.startedOn;
        }

        var endDate = project.dueDate;
        if (project.finishedOn) {
          endDate = project.finishedOn;
        }

        var momentStartDate = moment(startDate);
        var momentEndDate = moment(endDate);
        var difference = momentEndDate.diff(momentStartDate, "days");

        return next(null, difference);
      }],


    };

    async.auto(tasks, function(err, result) {
      if (err) {
        return res.serverError(ApiService.toErrorJSON(
          new Errors.UnknownError(err)));
      }

      var response = {
        "find": result.find,
        "getTasks": result.getTasks,
        "getProjectDuration": result.getProjectDuration
      };

      return res.json(ApiService.toSuccessJSON(response));
    });
  }
}
