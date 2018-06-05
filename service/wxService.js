/**
 * 微信API请求服务包装
 */
const q = require('q');
const _request = require('../core/request');
const siteConf = require('../config/site_conf');

/**
 * 声明wxService类
 */
function wxService () {}

/**
 * 获取用户授权code
 * @param {*} jscode 
 */
wxService.getAuthorizationCode = (jscode) => {
    var deferred = q.defer();
    _request.get('/wx/sns/jscode2session',{
        appid: siteConf.wxappid,
        secret: siteConf.wxsecret,
        js_code: jscode,
        grant_type: 'authorization_code'
    }, true).then((res) => {
        deferred.resolve(res);
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

module.exports = wxService