
module.exports = {

  users: function(req, res) {
    var tasks = {
      users : function(next) {
        User.find({}, function(err, users) {
          return next(err, users)
        })
      },
      merge: ["users", function(next, cres) {
        var mergedUsers = []
        var users = cres.users
        users.forEach( function(user){
          UserService.generateUserJson(user.userId, function(err,result){
            if (err) {
              return next(err)
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
        console.log("here error!!!" + err)
        payload = ApiService.toErrorJSON(new Errors.UnknownError())
        return res.serverError(payload)
      } else {
        var sortedArray = result.merge.sort(function(a, b) {
          return b.totalPointsDone - a.totalPointsDone
        })
        payload = ApiService.toSuccessJSON(sortedArray)
        return res.json(payload)
      }
    })
  }

}