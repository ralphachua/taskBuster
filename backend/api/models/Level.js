
module.exports = {
  
  tableName: "levels",

  attributes: {
    levelId: {
      type: "string",
      required: true
    },
    levelName: {
      type: "string",
      required: true
    },
    accumulatedPoints: {
      type: "string",
      required: true
    },
    requiredPoints: {
      type: "integer",
      required: true
    },
  }
}