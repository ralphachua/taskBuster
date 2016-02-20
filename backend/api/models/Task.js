
module.exports = {
  
  tableName: "tasks",

  attributes: {
    taskId: {
      type: "string",
      required: true,
      columnName: "taskId"
    },

    taskName: {
      type: "string",
      required: true,
      columnName: "taskName"
    },

    taskDescription: {
      type: "string",
      required: true,
      columnName: "taskDescription"
    },

    taskPoints: {
      type: "integer",
      required: true,
      columnName: "taskPoints"
    },

    projectId: {
      type: "string",
      required: true,
      columnName: "projectId"
    },

    assignedTo: {
      type: "string",
      required: true,
      columnName: "assignedTo"
    },

    status: {
      type: "string",
      defaultsTo: "TODO",
      columnName: "status"
    },

    doneAt: {
      type: "date",
      columnName: "doneAt"
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