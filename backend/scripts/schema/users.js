db.users.drop();

db.users.insert({
  "user_id"         : "user001",
  "name"            : "Fountain Pen",
  "gender"          : "male",
  "avatarUrl"           : "/avatar/fountain",
  "level"     : {
    "name": "level 2",
    "currentPoints": 30,
    "requiredPoints": 50
  },
  "activeBadge": {
    "badgeUrl": "/img/123",
    "badgeName": "Bug Crusher"
  },
  "task": {
    "done": 8,
    "total": 10
  }
});

db.users.insert({
  "user_id"         : "user002",
  "name"            : "Mountain Den",
  "gender"          : "male",
  "avatarUrl"           : "/avatar/mountain",
  "level"     : {
    "name": "level 1",
    "currentPoints": 10,
    "requiredPoints": 20
  },
  "activeBadge": {
    "badgeUrl": "/img/124",
    "badgeName": "Trainee"
  },
  "task": {
    "done": 8,
    "total": 10
  }
});
