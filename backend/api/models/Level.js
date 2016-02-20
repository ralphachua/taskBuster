
module.exports = {
  
  tableName: "levels",

  attributes: {
    levelId: {
      type: "string",
      required: true,
      columnName: "level_id"
    },
    levelName: {
      type: "string",
      required: true,
      columnName: "level_name"
    },
    accumulatedPoints: {
      type: "string",
      required: true,
      columnName: "accumulated_points"
    },
    requiredPoints: {
      type: "integer",
      required: true,
      columnName: "required_points"
    },
  }
}