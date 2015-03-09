'use strict';

var devices = require('../controllers/devices');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.device.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/devices')
    .get(devices.all)
    .post(auth.requiresLogin, devices.create);
  app.route('/devices/:deviceId')
    .get(devices.show)
    .put(auth.requiresLogin, hasAuthorization, devices.update)
    .delete(auth.requiresLogin, hasAuthorization, devices.destroy);

  // Finish with setting up the deviceId param
  app.param('deviceId', devices.device);
};