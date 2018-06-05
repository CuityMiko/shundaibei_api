/**
 * 省市县SQL - Mapping
 */

// 获取省份
const getProvinces = 'SELECT code, name FROM provinces';

// 获取所有省市县数据
const getAreas =`
SELECT p.name as pname,c.name as cname,a.name as aname, a.code as acode, a.cityCode as ccode, a.provinceCode as pcode FROM provinces p 
LEFT JOIN cities c ON p.code = c.provinceCode 
LEFT JOIN areas a ON c.code = a.cityCode
`;

// 根据省份code获取市县级信息
const getAreasByprovincecode =`
SELECT p.name as pname,c.name as cname,a.name as aname, a.code as acode, a.cityCode as ccode, a.provinceCode as pcode FROM provinces p 
LEFT JOIN cities c ON p.code = c.provinceCode 
LEFT JOIN areas a ON c.code = a.cityCode
where p.code = ?
`;

// 根据省份名称获取市县级信息
const getAreasByprovincename =`
SELECT p.name as pname,c.name as cname,a.name as aname, a.code as acode, a.cityCode as ccode, a.provinceCode as pcode FROM provinces p 
LEFT JOIN cities c ON p.code = c.provinceCode 
LEFT JOIN areas a ON c.code = a.cityCode
where p.name = ?
`;

module.exports = {
    getProvinces,
    getAreas,
    getAreasByprovincecode,
    getAreasByprovincename
}