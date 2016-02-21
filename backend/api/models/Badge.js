
module.exports = {
  
  tableName: "badges",

  attributes: {
    badgeId: {
      type: "string",
      required: true
    },
    badgeName: {
      type: "string",
      required: true
    },
    badgeUrl: {
      type: "string",
      required: true
    },
    requiredPoints: {
      type: "integer",
      required: true
    },
  }
}