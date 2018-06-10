/**
 * FileController
 */

var path = require('path');
var cos = require('../core/cos');
var tools = require('../common/tools');

// 上传页
exports.index = function(req, res) {
    res.render('files/index');
};

// 上传图片
exports.uploadimage = function(req, res) {
    // tools.uploadImage(req).then((result) => {
    //     res.json(result);
    // }).catch((err) => {
    //     console.log(err);
    //     res.json(err);
    // })

    tools.uploadImageRemote(req, 'shundaibei/images/').then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
}

// 上传
exports.upload = function(req, res) {
    var _filepath = path.resolve(__dirname, '../resources/images/sjb.png');
    cos.fileupload('shundaibei/idcards/shijiebei4.png', _filepath).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
};

// 下载
exports.download = function(req, res) {
    var _filepath = path.resolve(__dirname, '../resources/images/sjbddd.png');
    cos.filedownload('shundaibei/idcards/shijiebei4.png', _filepath).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
}