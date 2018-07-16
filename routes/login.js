/**
 * LoginRouter
 */
var Login = require('../controller/login.js');

module.exports = function(app) {
  // 登录
  app.get('/login', Login.index);
};