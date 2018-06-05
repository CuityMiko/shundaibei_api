/**
 * redis封装
 * redis key 命名规则：key = 文件名-方法名-参数值1-参数值2-....
 */

var redis = require("redis");  
var q = require('q');
var siteConf = require('../config/site_conf.js');
var client = redis.createClient(siteConf.redisport, siteConf.redishost, {connect_timeout: siteConf.redistimeout, auth_pass: siteConf.redisauth_pwd});  
  
client.on("error", function (err) {  
  console.log("Error :" , err);  
});  

client.on('connect', function(){  
    console.log('Redis connect success!');  
})

/*
 * 数据库选择
 * redis默认连接数据库0,可以利用select选择指定数据库0~15
 */
client.select(siteConf.redisdb, function (err) {
    if (err) {
        return false;
    } else {
        console.log('redis db change success');
    }   
});

/**
 * 声明类名
 */
function db () {}
  
/** 
 * 添加string类型的数据 
 * @param key 键 
 * @params value 值  
 * @params expire (过期时间,单位秒;可为空，为空表示不过期) 
 */  
db.set = (key, value, expire) => {  
    var deferred = q.defer();
    client.set(key, value, function(err, result){  
        if (err) {  
            console.log(err);  
            deferred.reject(err);
            return;
        }  
        if (!isNaN(expire) && expire > 0) {  
            client.expire(key, parseInt(expire));
        }
        deferred.resolve(result);
    })  
    return deferred.promise;
}  
  
/** 
 * 查询string类型的数据 
 * @param key 键 
 * @param callBack(err,result) 
 */  
db.get = (key) => { 
    var deferred = q.defer();
    client.get(key, function(err,result){
        if (err) {  
            console.log(err);  
            deferred.reject(err);
            return;  
        }  
        deferred.resolve(result);
    });
    return deferred.promise;
}

/**
 * 判断key是否存在
 * @param {*} key 
 */
db.exists = (key) => {
    var deferred = q.defer();
    client.exists(key, function(err, reply) {
        if (err) {
            console.log(err);  
            deferred.reject(err);
            return;
        }
        if (reply === 1) {
            deferred.resolve({ exists: true });
        } else {
            deferred.resolve({ exists: false });
        }
    });
    return deferred.promise;
}

/**
 * 删除key（或删除多个key [key1, key2, key3]）
 * @param {*} key 
 * 删除成功，返回1，否则返回0(对于不存在的键进行删除操作，同样返回0)
 */
db.delete = (key) => {
    var deferred = q.defer();
    client.del(key, function (err, reply) {
        console.log(err);
        console.log(reply);
        if (err) {
            console.log(err);  
            deferred.reject(err);
            return;
        }
        if (reply === 1) {
            deferred.resolve({ delete: true });
        } else {
            deferred.resolve({ delete: false });
        }
    });
    return deferred.promise;
}

/**
 * 删除当前数据库所有缓存数据
 */
db.clear = () => {
    var deferred = q.defer();
    client.flushdb((err, res) => {
        if (err) {
            console.log(err);  
            deferred.reject(err);
            return;
        }
        console.log(res);
        deferred.resolve(res);
    })
    return deferred.promise;
}

/**
 * 删除所有缓存数据
 */
db.clearall = () => {
    var deferred = q.defer();
    client.flushall((err, res) => {
        if (err) {
            console.log(err);  
            deferred.reject(err);
            return;
        }
        console.log(res);
        deferred.resolve(res);
    })
    return deferred.promise;
}
  
module.exports = db;