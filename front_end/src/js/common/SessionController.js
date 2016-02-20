define([
  './CookieController'
],
function (CookieController) {
  var cookieCtrl = CookieController({
    name: 'taskBuster'
  });

  var _proto = {
    /**
      Create cookie now expects an object as its parameter.
      See CookieController.
    */
    createSession: function (data) {
      cookieCtrl.createCookie(data, 0);
    },
    /**
      Generalized fn for retrieving cookie object. Consumed by field-specific
      methods within SessionController.
    */
    getCookie: function () {
      var cookie = cookieCtrl.readCookie();

      if (cookie) {
        return JSON.parse(cookie);
      } else {
        return null;
      }
    },
    /**
      Gets the value sessionToken field.
    */
    getSessionToken: function () {
      var cookie = _proto.getCookie();

      if (cookie) {
        return _proto.getCookie().s;
      } else {
        return null;
      }

    },

    getMobileNumber: function () {
      var cookie = _proto.getCookie();

      if (cookie) {
        return  _proto.getCookie().m;
      } else {
        return null;
      }

    }

  };

  function SessionController () {

    return Object.create(_proto);

  }

  return SessionController;

});
