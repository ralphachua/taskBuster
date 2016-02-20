
module.exports = {
  
  tableName: "tasks",

  attributes: {
    taskId: {
      type: "string",
      required: true,
      columnName: "task_id"
    },

    taskName: {
      type: "string",
      required: true,
      columnName: "task_name"
    },

    taskDescription: {
      type: "string",
      required: true,
      columnName: "task_description"
    },

    taskPoints: {
      type: "integer",
      required: true,
      columnName: "task_points"
    },

    projectId: {
      type: "string",
      required: true,
      columnName: "project_id"
    },

    assignedTo: {
      type: "string",
      required: true,
      columnName: "assigned_to"
    },

    status: {
      type: "array",
      defaultsTo: "TODO",
      columnName: "status"
    },

    doneAt: {
      type: "date",
      columnName: "done_at"
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