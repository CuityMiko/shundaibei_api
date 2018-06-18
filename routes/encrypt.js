/**
 * EncryptRouter
 */
var Encrypt = require('../controller/encrypt.js');

module.exports = function(app) {
  // 加密
  app.get('/encrypt', Encrypt.index);
};