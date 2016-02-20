
module.exports = {
  
  tableName: "users",
  autoPK: false,

  attributes: {

    userId: {
      type: "string",
      required: true,
      columnName: "user_id"
    },

    name: {
      type: "string",
      required: true,
      columnName: "name"
    },

    gender: {
      type: "string",
      required: true,
      columnName: "gender"
    },

    avatarUrl: {
      type: "string",
      required: true,
      columnName: "avatar_url"
    },

    levelId: {
      type: "string",
      required: true,
      columnName: "level_id"
    },

    activeBadge: {
      type: "string",
      required: true,
      columnName: "active_badge"
    },

    badges: {
      type: "array",
      columnName: "badges"
    },

    totalPointsDone: {
      type: "integer",
      defaultsTo: 0,
      columnName: "total_points_done"
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