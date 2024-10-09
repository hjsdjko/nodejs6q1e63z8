import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op,literal, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import FuwupingjiaModel from '../models/FuwupingjiaModel'
import util from '../lib/util'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import request from 'request'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
const redis = require('redis')




export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let xiangmumingcheng = req.query.xiangmumingcheng
			if (xiangmumingcheng) {

				if (xiangmumingcheng.indexOf('%') != -1) {
					where.xiangmumingcheng = {
						[Op.like]: xiangmumingcheng
					}
				} else {
					where.xiangmumingcheng = {
						[Op.eq]: xiangmumingcheng
					}
				}
			}
			let zhaopian = req.query.zhaopian
			if (zhaopian) {

				if (zhaopian.indexOf('%') != -1) {
					where.zhaopian = {
						[Op.like]: zhaopian
					}
				} else {
					where.zhaopian = {
						[Op.eq]: zhaopian
					}
				}
			}
			let yonghuzhanghao = req.query.yonghuzhanghao
			if (yonghuzhanghao) {

				if (yonghuzhanghao.indexOf('%') != -1) {
					where.yonghuzhanghao = {
						[Op.like]: yonghuzhanghao
					}
				} else {
					where.yonghuzhanghao = {
						[Op.eq]: yonghuzhanghao
					}
				}
			}
			let yonghuxingming = req.query.yonghuxingming
			if (yonghuxingming) {

				if (yonghuxingming.indexOf('%') != -1) {
					where.yonghuxingming = {
						[Op.like]: yonghuxingming
					}
				} else {
					where.yonghuxingming = {
						[Op.eq]: yonghuxingming
					}
				}
			}
			let fuwutaidu = req.query.fuwutaidu
			if (fuwutaidu) {

				if (fuwutaidu.indexOf('%') != -1) {
					where.fuwutaidu = {
						[Op.like]: fuwutaidu
					}
				} else {
					where.fuwutaidu = {
						[Op.eq]: fuwutaidu
					}
				}
			}
			let pingjiariqi = req.query.pingjiariqi
			if (pingjiariqi) {

				if (pingjiariqi.indexOf('%') != -1) {
					where.pingjiariqi = {
						[Op.like]: pingjiariqi
					}
				} else {
					where.pingjiariqi = {
						[Op.eq]: pingjiariqi
					}
				}
			}
			let weixiuzhanghao = req.query.weixiuzhanghao
			if (weixiuzhanghao) {

				if (weixiuzhanghao.indexOf('%') != -1) {
					where.weixiuzhanghao = {
						[Op.like]: weixiuzhanghao
					}
				} else {
					where.weixiuzhanghao = {
						[Op.eq]: weixiuzhanghao
					}
				}
			}
			let weixiuxingming = req.query.weixiuxingming
			if (weixiuxingming) {

				if (weixiuxingming.indexOf('%') != -1) {
					where.weixiuxingming = {
						[Op.like]: weixiuxingming
					}
				} else {
					where.weixiuxingming = {
						[Op.eq]: weixiuxingming
					}
				}
			}
			let pingjiafankui = req.query.pingjiafankui
			if (pingjiafankui) {

				if (pingjiafankui.indexOf('%') != -1) {
					where.pingjiafankui = {
						[Op.like]: pingjiafankui
					}
				} else {
					where.pingjiafankui = {
						[Op.eq]: pingjiafankui
					}
				}
			}
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'yonghu') {
				where.yonghuzhanghao = {
					[Op.eq]: req.session.userinfo === undefined ? jwt.decode(req.headers.token).yonghuzhanghao : req.session.userinfo.yonghuzhanghao
				}
				if (where['userid'] != undefined) {
					delete where.userid
				}
			}
			if(tableName == 'weixiuyuan') {
				where.weixiuzhanghao = {
					[Op.eq]: req.session.userinfo === undefined ? jwt.decode(req.headers.token).weixiuzhanghao : req.session.userinfo.weixiuzhanghao
				}
				if (where['userid'] != undefined) {
					delete where.userid
				}
			}

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await FuwupingjiaModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
			//toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	  // 分页接口（前端）
	api.get('/lists', async (req, res) => {

		try {
			let result = await FuwupingjiaModel.findAll()
			toRes.record(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let xiangmumingcheng = req.query.xiangmumingcheng
			if (xiangmumingcheng) {

				if (xiangmumingcheng.indexOf('%') != -1) {
					where.xiangmumingcheng = {
						[Op.like]: xiangmumingcheng
					}
				} else {
					where.xiangmumingcheng = {
						[Op.eq]: xiangmumingcheng
					}
				}
			}


			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await FuwupingjiaModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejs6q1e63z8').pop(),'save');
			req.operation = '保存服务评价';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})



			const userinfo = await FuwupingjiaModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejs6q1e63z8').pop(),'add');
			req.operation = '新增服务评价';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}





			const userinfo = await FuwupingjiaModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejs6q1e63z8').pop(),'update');
			req.operation = '更新服务评价';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {


			await FuwupingjiaModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejs6q1e63z8').pop(),'delete');
			req.operation = '删除服务评价';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			await FuwupingjiaModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await FuwupingjiaModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await FuwupingjiaModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '
		let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
        if(tableName == 'yonghu') {
            where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
        }
        if(tableName == 'weixiuyuan') {
            where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
        }

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fuwupingjia WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})










	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "fuwupingjia"
			let where = " WHERE 1 = 1 "
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if(tableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM fuwupingjia " + where + " GROUP BY " + columnName 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let where = " WHERE 1 = 1 "
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(tableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if(tableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("fuwupingjia" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM fuwupingjia " + where + " GROUP BY " + xColumnName + " DESC"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let tableName = "fuwupingjia"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if(userTableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName/:timeStatType', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let timeStatType = req.params.timeStatType
			let tableName = "fuwupingjia"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if(userTableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}

			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            	} else {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            	}
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "fuwupingjia"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if(userTableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("fuwupingjia" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})






	// 分组统计接口
	api.get('/typeStat/fuwutaidu/weixiuxingming', async (req, res) => {

		try {
			
			let sql = ""
			let where = " WHERE 1 = 1 "
			if (jwt.decode(req.headers.token).tableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if (jwt.decode(req.headers.token).tableName == 'weixiuyuan') {
				where += " AND weixiuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}

			sql = `
				select
				weixiuxingming,
        		sum(case when fuwutaidu in ('非常满意') then 1 else 0 end) as 非常满意,        		sum(case when fuwutaidu in ('满意') then 1 else 0 end) as 满意,        		sum(case when fuwutaidu in ('一般') then 1 else 0 end) as 一般,        		sum(case when fuwutaidu in ('不满意') then 1 else 0 end) as 不满意        		from fuwupingjia
				${where}
        		group by weixiuxingming
			`;
            
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})









	return api
}
