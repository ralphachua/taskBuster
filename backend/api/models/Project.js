

module.exports = {
  
  tableName: "projects",

  attributes: {
    projectName: {
      type: "string",
      required: true
    },
    projectPointsTotal: {
      type: "integer",
      defaultsTo: 0
    },
    tasks: {
      type: "array",
      defaultsTo: []
    },
    members: {
      type: "array",
      defaultsTo: []
    },
    dueDate: {
      type: "date"
    },
    createdBy: {
      type: "string",
      required: true
    },
    status: {
      type: "string",
      defaultsTo: "TODO"
    },
    startedOn: {
      type: "date"
    },
    finishedOn: {
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