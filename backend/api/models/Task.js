
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
  }
}