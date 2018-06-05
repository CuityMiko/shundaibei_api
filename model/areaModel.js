/**
 * 省市县数据Model
 */

const db = require('../core/db');
const q = require('q');
const areaMapping = require('../mapping/areaMapping');
const _redis = require('../core/redis');
const _tools = require('../common/tools');
const _filename = _tools.getFilename(__filename); // 获取文件名称

/**
 * 声明area类
 */
function areaModel() {
}

/**
 * 获取省份
 */
areaModel.getProvinces = () => {
    let _key = `${_filename}-getProvinces`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getProvinces, (err, data) => {
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(data);
                    // 存入缓存
                    _redis.set(_key, JSON.stringify(data));
                }
            });
        }
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

/**
 * 获取所有省市县数据
 */
areaModel.getAreas = () => {
    let _key = `${_filename}-getAreas`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getAreas, (err, data) => {
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(data);
                    // 存入缓存
                    _redis.set(_key, JSON.stringify(data));
                }
            });
        }
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

/**
 * 根据省份名称获取省市县数据
 * @param {*} pname 省份名称
 */
areaModel.getAreasByprovincename = (pname) => {
    let _key = `${_filename}-getAreasByprovincename-${pname}`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getAreasByprovincename, [pname] ,(err, data) => {
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(data);
                    // 存入缓存
                    _redis.set(_key, JSON.stringify(data));
                }
            });
        }
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

/**
 * 根据省份code获取省市县数据
 * @param {*} pcode 省份名称
 */
areaModel.getAreasByprovincecode = (pcode) => {
    let _key = `${_filename}-getAreasByprovincecode-${pcode}`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getAreasByprovincecode, [pcode] ,(err, data) => {
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(data);
                    // 存入缓存
                    _redis.set(_key, JSON.stringify(data));
                }
            });
        }
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

module.exports = areaModel