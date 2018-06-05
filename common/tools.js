/**
 * 工具类
 */

const path = require('path');

/**
 * 声明类名
 */
function tools () {}

/**
 * 获取文件名称
 * @param {*} file 
 */
tools.getFilename = (file) => {
   return path.basename(file).replace('.js', '')
}

module.exports = tools