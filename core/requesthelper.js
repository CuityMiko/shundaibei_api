const config = require('../config/site_conf'),
      q = require('q'); 
      rp = require('request-promise'); 

/**
 * 获取api url
 * @param {*} url 
 */
let getapi = (url) => {
    let _urls = url.split('/');
    let _url = url;
    switch (_urls[1]) {
        case 'api':
            _url = config.siteConf.scenicurl + _url;
            break;
        case 'movie':
            _url = config.siteConf.movieurl + _url;
            break;
        case 'cstore':
            _url = config.siteConf.mockurl + _url;
        default:
            break;
    }
    return _url;
}

/**
 * get请求
 * @param {*} url 请求url
 * @param {*} params 请求参数对象
 * @param {*} headers 请求报文头
 */
let get = (url, params, headers = null) => {
    url = getapi(url);
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
 * @param {*} headers 请求报文头
 */
let post = (url, params, headers = null) => {
    url = getapi(url);
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