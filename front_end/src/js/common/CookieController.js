define(
	function(){
		var _proto = {
      /**
        Store the cookie name within the object so we don't have to update
        every call of createCookie if we decide to change to cookie name.

        Property should be set on object creation.
      */
      name: '',
      /**

      */
			createCookie: function (values, timestamp){
        var self = _proto;
        console.log(values);
 				document.cookie = self.name + '='+ JSON.stringify(values) +'; path=/;';
        return self;
 			},

			readCookie: function () {
        var self = _proto;
				var nameEQ = self.name + "=";
				var ca = document.cookie.split(';');
        var c;

				for(var i=0;i < ca.length;i++) {
					c = ca[i]; //removed the var declaration. memory leak.
					while (c.charAt(0)==' ')  {
            c = c.substring(1,c.length);
          }
					if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
          }
				}
				return null;
			},

			deleteCookie: function (){
        var self = _proto;
			  createCookie(self.name,"",-1);
			}
		};

		function CookieController(config){
      Object.assign(_proto, config);
			return Object.create(_proto);
		}
		return CookieController;
	}

);
