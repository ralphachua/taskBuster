define({
  API_HOST: (function () {
    var isLocal = false;
    if (isLocal) {
      return 'http://localhost:1337/';
    } else {
      return 'http://169.45.223.115:1337/';
    }
  })(),
  USER_INFO: {
    ID: '56c961053becd0753b5462c2',
    name: '',
    avatarUrl: '',
    level: {
      name: '',
      currentPoints: 0,
      requiredPoints: 50
    },
    activeBadge: {
      badgeUrl: '',
      badgeName: 'Bug Crusher'
    },
    task: {
      done: 0,
      total: 0
    }
  }
});
