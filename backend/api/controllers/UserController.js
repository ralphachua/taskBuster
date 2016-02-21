
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
        payload = ApiService.toSuccessJSON(result.task);
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