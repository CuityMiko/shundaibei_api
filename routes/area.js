/**
 * AreaRouter
 */
var Area = require('../controller/area.js');

module.exports = function(app) {
  // 获取省份信息
  app.get('/provinces', Area.getProvinces);

  // 获取所有省市县数据
  app.get('/areas', Area.getAreas);

  // 根据省份获取省市县数据
  app.get('/areas/:pcode', Area.getAreasByprovincecode);
};