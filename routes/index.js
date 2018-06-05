/**
 * IndexRouter
 */
var Index = require('../controller/index.js');

module.exports = function(app) {
  // 首页
  app.get('/', Index.index);

  // 省市县
  require('./area')(app);

  // 登录
  require('./login')(app);
};