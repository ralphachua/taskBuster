

module.exports = {
  
  tableName: "projects",

  attributes: {
    projectName: {
      type: "string",
      required: true,
      columnName: "project_name"
    },
    projectPointsTotal: {
      type: "integer",
      defaultsTo: 0,
      columnName: "project_points_total"
    },
    tasks: {
      type: "array",
      columnName: "tasks"
    },
    members: {
      type: "array",
      columnName: "members"
    },
    dueDate: {
      type: "date",
      columnName: "due_date"
    },
    createdBy: {
      type: "string",
      required: true,
      columnName: "created_by"
    },
    status: {
      type: "string",
      defaultsTo: "TODO",
      columnName: "status"
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