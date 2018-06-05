/**
 * 封装request
 */
const siteConf = require('../config/site_conf'),
      q = require('q'); 
      rp = require('request-promise'); 

/**
 * 获取api url
 * @param {*} url 
 * @param {*} rewrite 是否重写 
 */
let getapi = (url, rewrite) => {
    let _urls = url.split('/');
    let _url = url;
    switch (_urls[1]) {
        case 'wx':
            if (!rewrite)
                _url = siteConf.wxurl + _url;
            else {
                _url = _url.replace(`/${_urls[1]}`,'');
                _url = siteConf.wxurl + _url;
            }
            break;
        case 'mock':
            if (!rewrite)
                _url = siteConf.mockurl + _url;
            else {
                _url = _url.replace(`/${_urls[1]}`,'');
                _url = siteConf.mockurl + _url;
            }
            break;
        default:
            break;
    }
    return _url;
}

/**
 * get请求
 * @param {*} url 请求url
 * @param {*} params 请求参数对象
 * @param {*} rewrite 是否重写
 * @param {*} headers 请求报文头
 */
let get = (url, params, rewrite = false, headers = null) => {
    url = getapi(url, rewrite);
    var options = {
        method: 'GET',
        uri: url,
        qs: params,
        json: true
    };
    if (headers != null) {
        options.headers = headers;
    } else {
        options.headers = {
            'User-Agent': 'Request-Promise'
        };
    }
    var deferred = q.defer();
    rp(options)
    .then((res) => {
        deferred.resolve(res);
    })
    .catch((err) => {
        deferred.reject(err);
    });
    return deferred.promise;
} 

/**
 * post请求
 * @param {*} url 请求url
 * @param {*} params 请求参数对象
 * @param {*} rewrite 是否重写
 * @param {*} headers 请求报文头
 */
let post = (url, params, rewrite = false, headers = null) => {
    url = getapi(url, rewrite);
    var options = {
        method: 'POST',
        uri: url,
        body: params,
        json: true
    };
    if (headers != null) {
        options.headers = headers;
    }
    var deferred = q.defer();
    rp(options)
    .then((res) => {
        deferred.resolve(res);
    })
    .catch((err) => {
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports={ get, post };