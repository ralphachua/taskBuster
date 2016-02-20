db.levels.drop();

db.levels.insert({
  "levelId"            : "abc123",
  "levelName"          : "level 1",
  "accumulatedPoints"  : 0,
  "requiredPoints"     : 10
});

db.levels.insert({
  "levelId"            : "def456",
  "levelName"          : "level 2",
  "accumulatedPoints"  : 10,
  "requiredPoints"     : 20
});

db.levels.insert({
  "levelId"            : "ghi789",
  "levelName"          : "level 3",
  "accumulatedPoints"  : 30,
  "requiredPoints"     : 40
});