var stderror = require("stderror");
var Errors = stderror.extend("Exception");

Errors.define({name: "UnknownError", message: "An unknown error occurred"});
Errors.define({name: "UnauthorizedError", message: "Unauthorized Error."});
Errors.define({name: "ValidationError", message: "Validation Error."});
Errors.define({name: "RecordNotFound", message: "An unexpected RecordNotFound occurred."});
Errors.define({name: "RecordExistsError", message: "An unexpected RecordExistsError occurred."});
Errors.define({name: "InvalidStateError", message: "An unexpected InvalidStateError occurred."});
Errors.define({name: "InvalidArgumentError", message: "An unexpected InvalidArgumentError occurred."});

module.exports = Errors;