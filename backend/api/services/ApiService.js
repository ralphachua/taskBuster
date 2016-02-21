module.exports = {

  toErrorJSON: function(error) {
    var meta = {};
    var payload = {
      status: "error"
    };

    if (_.isString(error)) {
      payload.message = error;
    }
    else if (_.isObject(error)) {
      if (_.has(error, "message")) {
        payload.data = {
          message: error.message
        };
      }
      else {
        payload.data = {
          message: "An unknown error occurred"
        };
      }
    }

    if (!_.isEmpty(meta)) {
      sails.log.info(meta);
      sails.log.info(JSON.stringify(meta));
    }

    sails.log.error(payload);
    return payload;
  },

  toSuccessJSON: function(data) {
    var payload = {
      status: "success",
      data: data || null
    };

    return payload;
  }

}