
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

      user: ["project", function(next, cres) {
        var userIds = cres.project.members
        User.find({ id: userIds }, function(err, users) {
          return next(err, users);
        });
      }],

      member: ["user", function(next, cres) {
        var members = cres.project.members
        var users = cres.user;

        var mergedMembers = _.map(members, function(member) {
          var userObj = _.find(users, function(o) {
            return o.id == member;
          });

          return {
            userName: userObj.name,
            gender:   userObj.gender,
            avatarUrl:userObj.avatarUrl
          }
        });

        return next(null, mergedMembers);
      }],

      tasksDone: ["project", function(next, cres) {
        var params = {
          id: cres.project.tasks.id,
          status: "DONE"
        }

        Task.count(params, function(err, count) {
          return next(err, count);
        });
      }], 

      tasksTotal: ["project", function(next, cres) {
        return next(null, cres.project.tasks.length);
      }]
    }

    async.auto(tasks, function(err, result) {
      if (err) {
      	callback(new Errors.UnknownError());
      } else if (_.isEmpty(result.project)) {
      	callback(new Errors.RecordNotFound());
      } else {
        var data = {
          projectName:   result.project.projectName,
          tasksDone:     result.tasksDone,
          tasksTotal:    result.tasksTotal,
          members:       result.member
        };

        if (typeof callBack === "function") {
    		  callBack(null, data);
		    }
      }
    });
  }
}