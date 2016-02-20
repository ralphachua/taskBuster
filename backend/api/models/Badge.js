
module.exports = {
  
  tableName: "badges",

  attributes: {
    badgeId: {
      type: "string",
      required: true,
      columnName: "badge_id"
    },
    badgeName: {
      type: "string",
      required: true,
      columnName: "badge_name"
    },
    badgeUrl: {
      type: "string",
      required: true,
      columnName: "badge_url"
    },
    requiredPoints: {
      type: "integer",
      required: true,
      columnName: "required_points"
    },
  }
}