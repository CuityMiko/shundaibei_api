/**
 * FileRouter
 */
var File = require('../controller/files.js');

module.exports = function(app) {
  // 上传页s
  app.get('/files', File.index);

  // 上传图片
  app.post('/files/uploadimage', File.uploadimage);

  // 上传
  app.get('/files/upload', File.upload);

  // 下载
  app.get('/files/download', File.download);
};