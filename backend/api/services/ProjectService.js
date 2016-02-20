
module.exports = {

  generateProjectJson: function(projectId,callBack) {
  	var tasks = {
      project: function(next) {
        var params = {
          id: projectId
        }
        Project.findOne(params, function(err, project) {
          return next(err, project);
        });
      },
      member: ["project", function(next, cres) {
        var members = cres.project.members
        var mergedMembers = []
        members.forEach(function(member){
          var params = {
            userId : member
          }
          User.findOne(params, function(err, user){
            mergedMembers.push({
              userName: user.name,
              gender: user.gender,
              avatarUrl: user.avatarUrl
            })
            if (member == members[members.length - 1]) {
              return next(null, mergedMembers)
            }
          })
        })
      }],
      tasksDone: ["project", function(next, cres) {
        var tasksDone = 0
        var tasks = cres.project.tasks
        if (tasks) {
          tasks.forEach(function(task){
            var params = {
              id : task.id
            }
            Task.findOne(params, function(err, task){
              if (task.status == "DONE") {
                tasksDone++
              }
            })
            if (task == tasks[tasks.length - 1]) {
              return next(null, tasksDone)
            };
          })
        } else {
          return next(null, tasksDone)
        }
      }], 
      tasksTotal: ["project", function(next, cres) {
        var tasks = cres.project.tasks
        if (tasks) {
          return next(null, tasks.length)
        } else {
          return next(null, 0)
        }
      }]
    }

    async.auto(tasks, function(err, result) {
      if (err) {
      	callback(new Errors.UnknownError())
      } else if (_.isEmpty(result.project)) {
      	callback(new Errors.RecordNotFound())
      } else {
        var data = {
          projectName:   result.project.projectName,
          tasksDone:     result.tasksDone,
          tasksTotal:    result.tasksTotal,
          members:       result.member
        };
        if (typeof callBack === "function") {
    		  callBack(null,data)
		    }
      }
    });
  }
}