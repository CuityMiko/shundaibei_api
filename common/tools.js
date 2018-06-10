/**
 * 工具类
 */

const path = require('path');
const formidable = require('formidable'); //文件上传
const q = require('q');
const fs =require('fs');
const cos = require('../core/cos');

/**
 * 声明类名
 */
function tools () {}

/**
 * 文件重命名
 * @param {*} fileobj 上传的文件对象 
 */
var fileRename = (fileobj) => {
    var _oldfilename = path.basename(fileobj.path);
    var _filename = fileobj.name;
    var _basepath = '/public/uploads/images/';
    var _newfilename = _oldfilename + '_' + _filename;
    var _newfileparth = path.join(__dirname, '..' + _basepath + _newfilename);
    fs.renameSync(fileobj.path, _newfileparth); // 文件重命名
    // fs.unlinkSync(filepath) 删除文件
    return { filename: _newfilename, filepath: '/uploads/images/' + _newfilename, filelocalpath: _newfileparth};
 }

/**
 * 获取文件名称
 * @param {*} file 
 */
tools.getFilename = (file) => {
   return path.basename(file).replace('.js', '')
}

/**
 * 上传图片
 * @param {*} req 
 */
tools.uploadImage = (req) => {
    var savePath = path.join(__dirname, '../public/uploads/images/');
    var form = new formidable.IncomingForm({ uploadDir: savePath });
    var deferred = q.defer();
    form.parse(req, function (err, fields, files) {
        if (err)
            deferred.reject(err);
        else {
            var _newfile =  fileRename(files.file);
            deferred.resolve(_newfile);
        }
    });
    return deferred.promise;
}

/**
 * 上传图片至远程服务器
 * @param {*} req 
 * @param {*} remotedir 远程图片目录 
 */
tools.uploadImageRemote = (req, remotedir) => {
    var deferred = q.defer();
    tools.uploadImage(req).then((res) => {
        cos.fileupload(remotedir + res.filename, res.filelocalpath).then((result) => {
            fs.unlinkSync(res.filelocalpath) // 上传成功并删除本地文件
            deferred.resolve(result);
        }).catch((err) => {
            deferred.reject(err);
        })
    }).catch((err) => {
        deferred.reject(err);
    })
    return deferred.promise;
}

module.exports = tools