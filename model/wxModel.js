/**
 * 微信数据Model
 */

const db = require('../core/db');
const q = require('q');
const wxMapping = require('../mapping/wxMapping');
// const _redis = require('../core/redis');
// const _tools = require('../common/tools');
// const _filename = _tools.getFilename(__filename); // 获取文件名称

/**
 * 声明area类
 */
function wxModel() {
}

/**
 * 保存微信用户数据
 * @param {*} wxuser 微信用户对象
 */
wxModel.insertWXUser = (wxuser) => {
    // 读取缓存数据
    let deferred = q.defer();
    db.query(wxMapping.deleteWXUser, [wxuser.openId] ,(err, data) => {
        if(err){
            console.log(err);
            deferred.reject(err);
        }
        else{
            db.query(wxMapping.insertWXUser, [wxuser.openId, wxuser.nickName, wxuser.gender, wxuser.language, wxuser.city, wxuser.province, wxuser.country, wxuser.avatarUrl] ,(err, data) => {
                if(err){
                    console.log(err);
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(data);
                }
            });
        }
    });
    return deferred.promise;
}

module.exports = wxModel