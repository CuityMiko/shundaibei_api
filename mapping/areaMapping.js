/**
 * 省市县SQL - Mapping
 */

// 获取省份
const getProvinces = 'SELECT code, name FROM provinces';

// 获取所有城市
const getCities = "SELECT * FROM cities where name != '省直辖县级行政区划'";

// 城市模糊查询
const getCitiesbySearch = "SELECT * FROM cities where name like ?";

// 插入用户选择城市日志
const insertSelectCitytoLogs = 'INSERT INTO select_city_logs(citycode, openId, channel, userid) VALUES (?,?,?,?)'

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

// 根据省份code获取该省份下的街道信息
const getStreetsByprovincecode =`
SELECT p.name as pname,c.name as cname,a.name as aname, s.name as sname, s.code as scode, a.code as acode, a.cityCode as ccode, a.provinceCode as pcode FROM provinces p 
LEFT JOIN cities c ON p.code = c.provinceCode 
LEFT JOIN areas a ON c.code = a.cityCode
LEFT JOIN streets s ON a.code = s.areaCode
where p.code = ?
`
// 获取热搜城市（搜索次数大于5次的并且不包含默认的热门城市：北京、上海、广州、深圳、杭州）
const getHotCitys = `
select a.*,b.sum from cities as a RIGHT JOIN
(select citycode,COUNT(citycode) as sum FROM select_city_logs GROUP BY citycode HAVING sum > 5 ) as b 
ON a.code = b.citycode where a.code not in ('1101', '3101', '4401', '4403', '3301') ORDER BY b.sum desc
`

module.exports = {
    getProvinces,
    getAreas,
    getAreasByprovincecode,
    getAreasByprovincename,
    getStreetsByprovincecode,
    getCities,
    getCitiesbySearch,
    insertSelectCitytoLogs,
    getHotCitys
}