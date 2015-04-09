var errors = require('./default.json');

for (var k in errors) {

  var e = errors[k];

  errors[k] = new Error(e.message);
  errors[k].status = e.status;
}

errors.generate = function (error, message, err) {

  var e = errors[error];

  e = e || errors.UNKNOWN;
  err = err || {};

  e.message = message || e.message;

  e.details = {
    name: err.name,
    message: err.message,
    // TODO: log stack
    // stack: err.stack,
    fileName: err.fileName,
    _json: err,
    _raw: JSON.stringify(err)
  };

  return e;
};

module.exports = errors;