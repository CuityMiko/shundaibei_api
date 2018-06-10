/**
 * FileController
 */

var path = require('path');
var cos = require('../core/cos');
var formidable = require('formidable'); //文件上传

// 上传页
exports.index = function(req, res) {
    res.render('files/index');
};

// 上传图片
exports.uploadimage = function(req, res) {
    var savePath = path.join(__dirname, '../uploads/images/');
    var form = new formidable.IncomingForm({ uploadDir: savePath });
    form.parse(req, function (err, fields, files) {
        console.log(err);
        console.log(fields);
        console.log(files);
        res.json('ok');
        // var _dater = tools.dateFormat('yyyyMMddhhmmssSSS', new Date());
        // var _drct = savePath;
        // var oldpath = files.qqfile.path;
        // fs.readFile(oldpath, function (err, data) {
        //     if (err) {
        //         console.log(111);
        //     }
        //     else {
        //         var _imgpath = '/images/' + _dater + files.qqfile.name;
        //         var _imgbtarr = data.toByteArray();
        //         common.uploadImage({
        //             FileName: _dater + files.qqfile.name,
        //             ContentType: _getContentType(path.extname(oldpath)),
        //             ContentLength: _imgbtarr.length,
        //             ImgArr: _imgbtarr
        //         }, (err, result) => {
        //             if (err) {
        //                 console.log(111);
        //             } else {
        //                 if (result.Results != null) {
        //                     var _imgobj = {
        //                         pictureId:result.Results[0].PictureId,
        //                         thumb:result.Results[0].PictureUrl,
        //                         showthumb:result.Results[0].PictureUrl,
        //                         success:true
        //                     };
        //                     res.json(_imgobj);
        //                 } else {
        //                     console.log(111);
        //                 }
        //             }
        //         });
        //     }
        // });
    });
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