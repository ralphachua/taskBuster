
module.exports = {
  
  tableName: "users",
  autoPK: false,

  attributes: {

    userId: {
      type: "string",
      required: true
    },

    name: {
      type: "string",
      required: true
    },

    gender: {
      type: "string",
      required: true
    },

    avatarUrl: {
      type: "string",
      required: true
    },

    levelId: {
      type: "string",
      required: true
    },

    activeBadge: {
      type: "string",
      required: true
    },

    badges: {
      type: "array",
    },

    totalPointsDone: {
      type: "integer",
      defaultsTo: 0
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