
module.exports = {
  
  tableName: "tasks",

  attributes: {

    taskName: {
      type: "string",
      required: true
    },

    taskDescription: {
      type: "string",
      required: true
    },

    taskPoints: {
      type: "integer",
      required: true
    },

    projectId: {
      type: "string",
      required: true
    },

    assignedTo: {
      type: "string",
      required: true
    },

    status: {
      type: "string",
      defaultsTo: "TODO"
    },

    doneAt: {
      type: "date"
    },

    toJSON: function() {
      var moment = require("moment");
      var object = this.toObject();
      object.createdAt = moment().utc(this.createdAt).format();
      object.updatedAt = moment().utc(this.updatedAt).format();
      return object;
    }
  },

  /*afterCreate: function(values, done) {
    var tasks = {
      find: function(next) {
        Project.find({ id: values.projectId }, function(err, project){
          next(err, project);
        });
      },
      update: ["find", function(next, cres) {
        var params = {
          projectPointsTotal: values.taskPoints + cres.find.projectPointsTotal
        };
        Project.update({ id: values.projectId }, function(err, project){
          next(err, project);
        });
      }]
    }
    
    async.auto(tasks, function(err, result) {
      return done();
    });
  
  },*/
}