var mongoose = require('mongoose');
var config = require('../etc/config.json');

module.exports = function setUpConnection(env) {
  if ('undefined' == typeof env) {
    env = 'development';
  }
  mongoose.connect(
  // `mongodb://kostiantyn.manko:password@ds263367.mlab.com:63367/bookshop`
  `mongodb://${config[env].db.host}:${config[env].db.port}/${config[env].db.name}`, {
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
  });
}
