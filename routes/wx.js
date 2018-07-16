/**
 * WXRouter
 */
var WX = require('../controller/wx.js');

module.exports = function(app) {
  // 微信请求
  app.get('/wx', WX.index);

  // 解密数据
  app.post('/api/wx/decrypt', WX.decryptData);
};