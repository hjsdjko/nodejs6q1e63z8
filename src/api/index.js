import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import YonghuController from './Yonghu'
import WeixiuyuanController from './Weixiuyuan'
import XiangmufenleiController from './Xiangmufenlei'
import WeixiufuwuController from './Weixiufuwu'
import YuyueweixiuController from './Yuyueweixiu'
import JiedanxinxiController from './Jiedanxinxi'
import ShangmenfuwuController from './Shangmenfuwu'
import FuwuxinxiController from './Fuwuxinxi'
import FuwupingjiaController from './Fuwupingjia'
import SyslogController from './Syslog'
import NewstypeController from './Newstype'
import NewsController from './News'
import StoreupController from './Storeup'
import AboutusController from './Aboutus'
import SystemintroController from './Systemintro'
import MessagesController from './Messages'

export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/yonghu', YonghuController({ config, db }))

	api.use('/weixiuyuan', WeixiuyuanController({ config, db }))

	api.use('/xiangmufenlei', XiangmufenleiController({ config, db }))

	api.use('/weixiufuwu', WeixiufuwuController({ config, db }))

	api.use('/yuyueweixiu', YuyueweixiuController({ config, db }))

	api.use('/jiedanxinxi', JiedanxinxiController({ config, db }))

	api.use('/shangmenfuwu', ShangmenfuwuController({ config, db }))

	api.use('/fuwuxinxi', FuwuxinxiController({ config, db }))

	api.use('/fuwupingjia', FuwupingjiaController({ config, db }))

	api.use('/syslog', SyslogController({ config, db }))

	api.use('/newstype', NewstypeController({ config, db }))

	api.use('/news', NewsController({ config, db }))

	api.use('/storeup', StoreupController({ config, db }))

	api.use('/aboutus', AboutusController({ config, db }))

	api.use('/systemintro', SystemintroController({ config, db }))

	api.use('/messages', MessagesController({ config, db }))

	return api
}
