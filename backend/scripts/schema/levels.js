db.levels.drop();

db.levels.insert({
  "level_id"            : "abc123",
  "level_name"          : "level 1",
  "accumulated_points"  : 0,
  "required_points"     : 10
});

db.levels.insert({
  "level_id"            : "def456",
  "level_name"          : "level 2",
  "accumulated_points"  : 10,
  "required_points"     : 20
});

db.levels.insert({
  "level_id"            : "ghi789",
  "level_name"          : "level 3",
  "accumulated_points"  : 30,
  "required_points"     : 40
});