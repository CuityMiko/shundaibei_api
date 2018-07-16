/**
 * 省市县数据Model
 */

const db = require('../core/db');
const q = require('q');
const areaMapping = require('../mapping/areaMapping');
const _redis = require('../core/redis');
const _tools = require('../common/tools');
const _filename = _tools.getFilename(__filename); // 获取文件名称
const pinyinlite = require('transliteration').transliterate // 汉子转拼音

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
 * 获取所有城市
 */
areaModel.getCities = () => {
    let _key = `${_filename}-getCities`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getCities, (err, data) => {
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

//按首字母排序
function pySort(arr,empty){
    if(!String.prototype.localeCompare)
        return null;
    var letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
    var zh ="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split('');     //*占位没有i,u,v拼音开头的汉字
    var arrList = [];
    for(var m =0;m<arr.length;m++){
        arrList.push({name: arr[m].name, code: arr[m].code});
    }
    var result = [];
    var curr;
    for(var i=0;i<letters.length;i++){
        curr = {letter: letters[i], data:[]};
        if(i!=26){
            for(var j =0;j<arrList.length;j++){
                var initial = arrList[j].name.charAt(0);           //截取第一个字符
                initial = pinyinlite(initial).split(' ')[0].charAt(0); 
                if(initial==letters[i]||initial==letters[i].toLowerCase()){   //首字符是英文的
                    curr.data.push(arrList[j]);
                }
            }
        }
        if(empty || curr.data.length) {
            result.push(curr);
            curr.data.sort(function(a,b){
                return a.name.localeCompare(b.name);       //排序,英文排序,汉字排在英文后面 (有问题)
            });
        }
    }
    return result;
}

/**
 * 获取所有城市并按照首字母排序
 */
areaModel.getCitiesByletter = () => {
    let _key = `${_filename}-getCitiesByletter`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getCities, (err, data) => {
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(pySort(data));
                    // 存入缓存
                    _redis.set(_key, JSON.stringify(pySort(data)));
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
 * @param {*} pcode 省份code
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

/**
 * 根据省份code获取该省份下的街道信息
 * @param {*} pcode 省份code
 */
areaModel.getStreetsByprovincecode = (pcode) => {
    let _key = `${_filename}-getStreetsByprovincecode-${pcode}`;
    // 读取缓存数据
    let deferred = q.defer();
    _redis.get(_key).then((res) => {
        if (res) {
            deferred.resolve(JSON.parse(res));
        } else {
            db.query(areaMapping.getStreetsByprovincecode, [pcode] ,(err, data) => {
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
 * 城市模糊查询
 * @param {*} search 模糊查询
 */
areaModel.getCitiesbySearch = (search) => {
    let deferred = q.defer();
    var _search = `%${search}%`;
    db.query(areaMapping.getCitiesbySearch, [_search] ,(err, data) => {
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

/**
 * 插入用户选择城市日志
 * @param {*} usercity 用户选择城市
 */
areaModel.insertSelectCitytoLogs = (usercity) => {
    let deferred = q.defer();
    db.query(areaMapping.insertSelectCitytoLogs, [usercity.citycode, usercity.openId, usercity.channel, usercity.userid] ,(err, data) => {
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

/**
 * 获取热搜城市（搜索次数大于5次的并且不包含默认的热门城市：北京、上海、广州、深圳、杭州）
 */
areaModel.getHotCitys = () => {
    let deferred = q.defer();
    db.query(areaMapping.getHotCitys, (err, data) => {
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = areaModel