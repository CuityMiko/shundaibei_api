/**
 * WXController
 */
var wxService = require('../service/wxService');
var wxModel = require('../model/wxModel');
var siteConf = require('../config/site_conf');
var WXBizDataCrypt = require('../core/WXBizDataCrypt');

exports.index = function(req, res) {
    var jscode = req.query.jscode || '';
    wxService.getAuthorizationCode(jscode).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json('getAuthorizationCode faild!');
    })
};

/**
 * 解密信息
 * @param {*} req 
 * @param {*} res 
 */
exports.decryptData = (req, res) => {
    var encryptedData = req.body.encryptedData || '';
    var iv = req.body.iv || '';
    var jscode = req.body.jscode || '';
    if (encryptedData == '' || iv == '' || jscode == '') {
        res.json({
            success: false,
            errormsg: '信息不能为空',
            result: null
        })
    } else {
        wxService.getAuthorizationCode(jscode).then((result) => {
            /**
             * result:
             * {"session_key":"CB+BI4gyPbxTXnUucoi5Yg==","expires_in":7200,"openid":"orjoc0UXWpYC3IDyYNWrBqpjrRUM"}
             */
            try {
                var pc = new WXBizDataCrypt(siteConf.wxappid, result.session_key);
                var data = pc.decryptData(encryptedData , iv);
                if (req.body.flag == 'getUserInfo') { // 获取用户信息同时保存到数据库
                    wxModel.insertWXUser(data).then((result2) => {
                    })
                }
                res.json({
                    success: true,
                    errormsg: '',
                    result: data
                })
            } catch (error) {
                console.log(error);
                res.json({
                    success: false,
                    errormsg: '解密失败',
                    result: null
                })
            }
        }).catch((err) => {
            console.log(err);
            res.json({
                success: false,
                errormsg: '解密失败',
                result: null
            })
        })
        
    }
}