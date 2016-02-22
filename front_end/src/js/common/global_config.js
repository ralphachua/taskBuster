define({
  API_HOST: (function () {
    var isLocal = true;
    if (isLocal) {
      return 'http://localhost:1337/';
    } else {
      return 'http://169.45.223.115:1337/';
    }
  })(),
  USER_INFO: {
    ID: 'user001',
    TITLE: '',
    NAME: '',
    LV: 0
  }
});
