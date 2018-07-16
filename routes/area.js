/**
 * AreaRouter
 */
var Area = require('../controller/area.js');

module.exports = function(app) {
  // 获取省份信息
  app.get('/api/provinces', Area.getProvinces);

  // 获取所有城市信息
  app.get('/api/cities', Area.getCities);

  // 获取热搜城市
  app.post('/api/cities/hot', Area.getHotCitys);

  // 获取所有城市信息
  app.post('/api/cities/search', Area.getCitiesbySearch);

  // 插入用户选择城市日志
  app.post('/api/cities/insertselectcity', Area.insertSelectCitytoLogs);

  // 获取所有城市信息按照字母
  app.get('/api/citiesbyletter', Area.getCitiesByletters);

  // 获取所有省市县数据
  app.get('/api/areas', Area.getAreas);

  // 根据省份获取省市县数据
  app.get('/api/areas/:pcode', Area.getAreasByprovincecode);

  // 根据省份获取街道信息
  app.post('/api/areas/getstreets', Area.getStreetsByprovincecode);
};