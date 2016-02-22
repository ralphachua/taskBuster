
module.exports = {

  create: function(req, res) {

    var tasks = {

      exist: function(next) {
        var params = {
          socialId: req.param("user_id")
        }
        User.findOne(params, function(err, user) {
          return next(err, user);
        })
      },

      save: ["exist", function(next, cres) {
        if (_.isEmpty(cres.exist)) {
          var params = {
            name:         req.param("given_name"),
            gender:       req.param("gender"),
            socialId:     req.param("user_id"),
            avatarUrl:    "/avatar/123",
            levelId:      1,
            activeBadge:  "qwe098",
            badges:       ["qwe098"]
          }

          User.create(params, function(err, user) {
            return next(err, user);
          });
        } else {
          return next(null, cres.exist);
        }
      }],

      project: ["save", function(next, cres) {
        if (_.isEmpty(cres.exist)) {
          var user = cres.save;
          var params = {
            projectName:  "Default Project",
            createdBy:    user.id,
            members:      [user.id]
          };

          Project.create(params, function(err, project) {
            return next(err, project);
          });
        } else{
          return next(null, cres.exist);
        }
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
      task: function(next) {
        Task.find({ 
          assignedTo: req.param("userId")
        }, function(err, tasks) {
          return next(err, tasks);
        });
      },
    }

    async.auto(tasks, function(err, result) {
      var payload = null;
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else {
        var data = _.map(result.task, function(task) {
          return {
            taskId:           task.taskId,
            taskName:         task.taskName,
            taskDescription:  task.taskDescription,
            taskPoints:       task.taskPoints,
            status:           task.status  
          }
        });
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  },

  showProjects: function(req, res) {
    var tasks = {
      task: function(next) {
        Task.find({ assignedTo: req.param("userId") }, function(err, task) {
          return next(err, task);
        });
      },
      project: ["task", function(next, cres) {
        var projectIds = _.union(_.map(cres.task, "projectId"));
        Project.find({ id: projectIds}, function(err, project) {
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
        var data = _.map(result.project, function(project) {
          return {
            projectId:  project.id,
            projectName:project.projectName,
            dueDate:    project.dueDate
          };
        });
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  }, 

  showBadges: function(req, res){
    var tasks = {
      task: function(next){
        Task.find({assignedTo: req.param("userId")}, function(err, task){
          return next(err, task);
        });
      },
      badge: ["task", function(next, cres){
        var badgeIds = _.union(_.map(cres.task, "badgeId"));
        Badge.find({id: badgeIds}, function(err, badge){
          return next(err, badge);
        });
      }]
    }

    async.auto(tasks, function(err, result){
      var payload = null;
      if(err){
        payload = ApiService.toErrorJSON(new Errors.UnknownError());
        return res.serverError(payload);
      } else{
        var data = _.map(result.badge, function(badge){
          return {
            badgeId: badge.id,
            badgeName: badge.badgeName,
          };
        });
        payload = ApiService.toSuccessJSON(data);
        return res.json(payload);
      }
    });
  }
}