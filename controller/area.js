/**
 * IndexController
 */
var _areaModel = require('../model/areaModel');

/**
 * 获取省份信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getProvinces = function(req, res) {
    _areaModel.getProvinces().then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};

/**
 * 获取所有城市
 * @param {*} req 
 * @param {*} res 
 */
exports.getCities = function(req, res) {
    _areaModel.getCities().then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};
const transliteration = require('transliteration').transliterate; // 汉子转拼音
/**
 * 获取所有城市按照字母
 * @param {*} req 
 * @param {*} res 
 */
exports.getCitiesByletters = function(req, res) {
    _areaModel.getCitiesByletter().then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};


/**
 * 获取区域信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getAreas = function(req, res) {
    _areaModel.getAreas().then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};

/**
 * 根据省份code获取省市县数据
 * @param {*} req 
 * @param {*} res 
 */
exports.getAreasByprovincecode = function(req, res) {
    var _pcode = req.params.pcode;
    _areaModel.getAreasByprovincecode(_pcode).then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};

/**
 * 根据省份code获取该省份下的街道信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getStreetsByprovincecode = function(req, res) {
    var _pcode = req.body.pcode || 1;
    _areaModel.getStreetsByprovincecode(_pcode).then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};

/**
 * 城市模糊查询
 * @param {*} req 
 * @param {*} res 
 */
exports.getCitiesbySearch = function(req, res) {
    var _search = req.body.search || 1;
    _areaModel.getCitiesbySearch(_search).then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};

/**
 * 获取热搜城市（搜索次数大于5次的并且不包含默认的热门城市：北京、上海、广州、深圳、杭州）
 * @param {*} req 
 * @param {*} res 
 */
exports.getHotCitys = function(req, res) {
    _areaModel.getHotCitys().then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
        res.json(null);
    })
};

/**
 * 插入用户选择城市日志
 * @param {*} req 
 * @param {*} res 
 */
exports.insertSelectCitytoLogs = function(req, res) {
    var _citycode = req.body.citycode || '';
    var _openId = req.body.openId || '';
    var _channel = req.body.channel || 0;
    var _userid = req.body.userid || 0;
    var _usercity = {
        citycode: _citycode,
        openId: _openId,
        channel: _channel,
        userid: _userid
    }
    _areaModel.insertSelectCitytoLogs(_usercity).then((result) => {
        res.json(result);
    }, (err) => {
        console.log(err);
    })
};