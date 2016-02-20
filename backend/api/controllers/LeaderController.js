
module.exports = {

  users: function(req, res) {
    var tasks = {
      users : function(next) {
        User.find({}, "userId", function(err, users) {
          return next(err, users)
        })
      },
      merge: ["users", function(next, cres) {
        var mergedUsers = []
        var users = cres.users
        users.forEach( function(user){
          UserService.generateUserJson(user.userId, function(result){
            if (result == Errors.UnknownError()) {
              return next(result, mergedUsers)
            } else {
              mergedUsers.push(result)
            }
            if (user == users[users.length - 1]) {
              console.log("here finally")
              return next(null,mergedUsers);    
            };
          }) 
        })
      }]
    }

    async.auto(tasks, function(err, result) {
      var payload = null
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError())
        return res.serverError(payload)
      } else if (result.merge.length <= 0) {
        var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("No users found"));
        return res.notFound(payload);
      } else {
        var sortedArray = result.merge.sort(function(a, b) {
          return b.totalPointsDone - a.totalPointsDone
        })
        payload = ApiService.toSuccessJSON(sortedArray)
        return res.json(payload)
      }
    })
  },

  projects: function(req, res) {
    var tasks = {
      projects : function(next) {
        Project.find({}, "id", function(err, projects){
          return next(err, projects)
        })
      },
      merge: ["projects", function(next, cres) {
        var mergedProjects = []
        var projects = cres.projects
        if (projects.length > 0) {
          projects.forEach( function(project) {
            ProjectService.generateProjectJson(project.id, function(results) {
              if (result == Errors.UnknownError()) {
                return next(result, mergedProjects)
              } else {
                mergedProjects.push(result)
              }
              if (project == projects[projects.length - 1]) {
                console.log("here finally")
                return next(null,mergedProjects);    
              };
            })
          })
        } else {
          console.log("no projects")
          return next (null, [])
        }
      }]
    }

    async.auto(tasks, function(err, result) {
      var payload = null
      if (err) {
        payload = ApiService.toErrorJSON(new Errors.UnknownError())
        return res.serverError(payload)
      } else if (result.merge.length <= 0) {
        var payload = ApiService.toErrorJSON(new Errors.RecordNotFound("No projects found"));
        return res.notFound(payload);
      } else {
        var sortedArray = result.merge.sort(function(a, b) {
          return b.tasksDone/b.tasksTotal - a.tasksDone/a.tasksTotal
        })
        payload = ApiService.toSuccessJSON(sortedArray)
        return res.json(payload)
      }
    })
  }
}