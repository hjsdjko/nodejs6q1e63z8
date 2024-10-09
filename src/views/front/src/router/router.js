import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import weixiuyuanList from '../pages/weixiuyuan/list'
import weixiuyuanDetail from '../pages/weixiuyuan/detail'
import weixiuyuanAdd from '../pages/weixiuyuan/add'
import xiangmufenleiList from '../pages/xiangmufenlei/list'
import xiangmufenleiDetail from '../pages/xiangmufenlei/detail'
import xiangmufenleiAdd from '../pages/xiangmufenlei/add'
import weixiufuwuList from '../pages/weixiufuwu/list'
import weixiufuwuDetail from '../pages/weixiufuwu/detail'
import weixiufuwuAdd from '../pages/weixiufuwu/add'
import yuyueweixiuList from '../pages/yuyueweixiu/list'
import yuyueweixiuDetail from '../pages/yuyueweixiu/detail'
import yuyueweixiuAdd from '../pages/yuyueweixiu/add'
import jiedanxinxiList from '../pages/jiedanxinxi/list'
import jiedanxinxiDetail from '../pages/jiedanxinxi/detail'
import jiedanxinxiAdd from '../pages/jiedanxinxi/add'
import shangmenfuwuList from '../pages/shangmenfuwu/list'
import shangmenfuwuDetail from '../pages/shangmenfuwu/detail'
import shangmenfuwuAdd from '../pages/shangmenfuwu/add'
import fuwuxinxiList from '../pages/fuwuxinxi/list'
import fuwuxinxiDetail from '../pages/fuwuxinxi/detail'
import fuwuxinxiAdd from '../pages/fuwuxinxi/add'
import fuwupingjiaList from '../pages/fuwupingjia/list'
import fuwupingjiaDetail from '../pages/fuwupingjia/detail'
import fuwupingjiaAdd from '../pages/fuwupingjia/add'
import syslogList from '../pages/syslog/list'
import syslogDetail from '../pages/syslog/detail'
import syslogAdd from '../pages/syslog/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'weixiuyuan',
					component: weixiuyuanList
				},
				{
					path: 'weixiuyuanDetail',
					component: weixiuyuanDetail
				},
				{
					path: 'weixiuyuanAdd',
					component: weixiuyuanAdd
				},
				{
					path: 'xiangmufenlei',
					component: xiangmufenleiList
				},
				{
					path: 'xiangmufenleiDetail',
					component: xiangmufenleiDetail
				},
				{
					path: 'xiangmufenleiAdd',
					component: xiangmufenleiAdd
				},
				{
					path: 'weixiufuwu',
					component: weixiufuwuList
				},
				{
					path: 'weixiufuwuDetail',
					component: weixiufuwuDetail
				},
				{
					path: 'weixiufuwuAdd',
					component: weixiufuwuAdd
				},
				{
					path: 'yuyueweixiu',
					component: yuyueweixiuList
				},
				{
					path: 'yuyueweixiuDetail',
					component: yuyueweixiuDetail
				},
				{
					path: 'yuyueweixiuAdd',
					component: yuyueweixiuAdd
				},
				{
					path: 'jiedanxinxi',
					component: jiedanxinxiList
				},
				{
					path: 'jiedanxinxiDetail',
					component: jiedanxinxiDetail
				},
				{
					path: 'jiedanxinxiAdd',
					component: jiedanxinxiAdd
				},
				{
					path: 'shangmenfuwu',
					component: shangmenfuwuList
				},
				{
					path: 'shangmenfuwuDetail',
					component: shangmenfuwuDetail
				},
				{
					path: 'shangmenfuwuAdd',
					component: shangmenfuwuAdd
				},
				{
					path: 'fuwuxinxi',
					component: fuwuxinxiList
				},
				{
					path: 'fuwuxinxiDetail',
					component: fuwuxinxiDetail
				},
				{
					path: 'fuwuxinxiAdd',
					component: fuwuxinxiAdd
				},
				{
					path: 'fuwupingjia',
					component: fuwupingjiaList
				},
				{
					path: 'fuwupingjiaDetail',
					component: fuwupingjiaDetail
				},
				{
					path: 'fuwupingjiaAdd',
					component: fuwupingjiaAdd
				},
				{
					path: 'syslog',
					component: syslogList
				},
				{
					path: 'syslogDetail',
					component: syslogDetail
				},
				{
					path: 'syslogAdd',
					component: syslogAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
