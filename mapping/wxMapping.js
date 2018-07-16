/**
 * 微信SQL - Mapping
 */

// 删除微信数据
const deleteWXUser = 'DELETE FROM wx_user where openid = ?;'

// 插入微信数据
const insertWXUser =`
INSERT INTO wx_user VALUES(NULL,?,?,?,?,?,?,?,?,NOW());
`;

module.exports = {
    insertWXUser,
    deleteWXUser
}