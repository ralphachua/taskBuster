
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
        var differenceInDays = momentEndDate.diff(momentStartDate, "days");

        var xAxisLabels = new Array(differenceInDays);
        for (var i = 0; i < differenceInDays; ++i) {
          xAxisLabels[i] = "Day " + (i + 1);
        }

        return next(null, {
          startDate: startDate,
          endDate: endDate,
          differenceInDays: differenceInDays,
          xAxisLabels: xAxisLabels
        });
      }],

      "getIdealBurnChartPoints": ["getProjectDuration", function(next, result) {
        var project = result.find;
        var projectTotalPoints = parseFloat(project.projectPointsTotal);

        var projectDuration = result.getProjectDuration;
        var projectDurationInDays = projectDuration.differenceInDays;

        var idealBurnRate = parseFloat(projectTotalPoints / projectDurationInDays);
        var idealBurnChartPoints = new Array(projectDurationInDays);

        for (var i = 0; i < projectDurationInDays; ++i) {
          sails.log.info("i: ", i);
          idealBurnChartPoints[i] = projectTotalPoints;
          projectTotalPoints = parseFloat(projectTotalPoints - idealBurnRate);
        }

        return next(null, idealBurnChartPoints);
      }],

      "getActualBurnChartPoints": ["getTasks", "getProjectDuration", function(next, result) {
        var project = result.find;
        var projectTotalPoints = project.projectPointsTotal;

        var tasks = result.getTasks;
        _.forEach(tasks, function(task) {
          if (task.status == "DONE") {
            task.doneAt = moment(task.doneAt).format("YYYY-MM-DD").toString();
          }
        });

        var projectDuration = result.getProjectDuration;
        var startDate = moment(projectDuration.startDate).format("YYYY-MM-DD").toString();
        var projectDurationInDays = projectDuration.differenceInDays;

        var actualBurnChartPoints = new Array(projectDurationInDays);

        for (var i = 0; i < projectDurationInDays; ++i) {
          var date = moment(startDate).add(i, "days").format("YYYY-MM-DD").toString();

          var tasksDoneAtDate = _.filter(tasks, function(task) {
            return (task.status == "DONE" && task.doneAt == date);
          });

          if (tasksDoneAtDate.length > 0) {
            var pointsDoneAtDate = _.pluck(tasksDoneAtDate, "taskPoints");
            var totalPointsDoneAtDate = _.reduce(pointsDoneAtDate, function(sum, points) {
              return sum + points;
            });

            projectTotalPoints = projectTotalPoints - totalPointsDoneAtDate;
          }

          actualBurnChartPoints[i] = projectTotalPoints;
        }

        return next(null, actualBurnChartPoints);
      }]
    };

    async.auto(tasks, function(err, result) {
      if (err) {
        return res.serverError(ApiService.toErrorJSON(
          new Errors.UnknownError(err)));
      }

      var project = result.find;
      var projectDuration = result.getProjectDuration;
      var getIdealBurnChartPoints = result.getIdealBurnChartPoints;
      var getActualBurnChartPoints = result.getActualBurnChartPoints;

      var response = {
        title: {
          text: 'Burndown Chart',
          x: -20
        },
        subtitle: {
          text: project.projectName,
          x: -20
        },
        xAxis: {
          title: {"text": "Days"},
          categories: projectDuration.xAxisLabels,
        },
        yAxis: {
          title: {"text": "Points"}
        },
        idealBurn: getIdealBurnChartPoints,
        actualBurn: getActualBurnChartPoints
      };

      return res.json(ApiService.toSuccessJSON(response));
    });
  }
}
