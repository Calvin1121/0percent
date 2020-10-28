import { $http } from './request';
module.exports = {
	getMblNoByWx:params=>$http(`login/getMblNoByWx`, params),
	getAllGoods:(params)=>$http(`web/getGood`, params),
	getGoods:(params)=>$http(`web/getGoodInfo`, params),
	collect:(params, is_collect)=>$http(`bus/userFollow/${is_collect?'saveOrUpdate':'delete'}`, params),
	collects:params=>$http(`web/getGoodScPage`, params),
	getProgress:params=>$http(`web/getGoodSpeed`, params)
}