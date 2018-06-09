/**
 * 腾讯云cos操作
 * cos-nodejs-sdk-v5 模块的安装需要在node7.0以上版本安装
 * 文件上传、文件下载
 */
// 引入模块
var COS = require('cos-nodejs-sdk-v5');
var path = require('path');
var q = require('q');
var siteConf = require('../config/site_conf');

// 声明COS对象
var _cos = new COS({
    // AppId: siteConf.cosappid,
    SecretId: siteConf.cossecretid,
    SecretKey: siteConf.cossecretkey
});

// 存储桶名称
const _bucket = 'shundaibei' + '-' + siteConf.cosappid;
// 存储区域名称
const _region = 'ap-shanghai';

/**
 * 声明cos类
 */
function cos() { }

/**
 * 上传文件
 * @param {*} remotefile 远程文件路径
 * @param {*} localfile 本地文件路径
 */
cos.fileupload = (remotefile, localfile) => {
    var deferred = q.defer();
    _cos.sliceUploadFile({
        Bucket: _bucket,
        Region: _region,
        Key: remotefile,
        FilePath: localfile
    }, function (err, data) {
        if (err)
            deferred.reject(err);
        else {
            var _result = {
                url: 'https://' + data.Location, // 文件url
                bucket: data.Bucket, // 文件存储桶名称
                filepath: data.Key // 文件存储路径
            };
            deferred.resolve(_result);
        }
    });
    return deferred.promise;
}

/**
 * 下载文件
 * @param {*} remotefile 远程文件路径
 * @param {*} localfile 本地文件路径
 */
cos.filedownload = (remotefile, localfile) => {
    var deferred = q.defer();
    var params = {
        Bucket: _bucket,
        Region: _region,
        Key: remotefile,
        Output : localfile
    };
    _cos.getObject(params, function(err, data) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(data);
    });
    return deferred.promise;
}

module.exports = cos;