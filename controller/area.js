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
 * 获取省份信息
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