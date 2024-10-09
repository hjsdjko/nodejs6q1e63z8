import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import aboutus from '@/views/modules/aboutus/list'
    import xiangmufenlei from '@/views/modules/xiangmufenlei/list'
    import yuyueweixiu from '@/views/modules/yuyueweixiu/list'
    import jiedanxinxi from '@/views/modules/jiedanxinxi/list'
    import fuwuxinxi from '@/views/modules/fuwuxinxi/list'
    import syslog from '@/views/modules/syslog/list'
    import fuwupingjia from '@/views/modules/fuwupingjia/list'
    import weixiufuwu from '@/views/modules/weixiufuwu/list'
    import weixiuyuan from '@/views/modules/weixiuyuan/list'
    import systemintro from '@/views/modules/systemintro/list'
    import yonghu from '@/views/modules/yonghu/list'
    import shangmenfuwu from '@/views/modules/shangmenfuwu/list'
    import messages from '@/views/modules/messages/list'
    import config from '@/views/modules/config/list'
    import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center', affix: true}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '通知公告',
        component: news
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/xiangmufenlei',
        name: '项目分类',
        component: xiangmufenlei
      }
      ,{
	path: '/yuyueweixiu',
        name: '预约维修',
        component: yuyueweixiu
      }
      ,{
	path: '/jiedanxinxi',
        name: '接单信息',
        component: jiedanxinxi
      }
      ,{
	path: '/fuwuxinxi',
        name: '服务信息',
        component: fuwuxinxi
      }
      ,{
	path: '/syslog',
        name: '系统日志',
        component: syslog
      }
      ,{
	path: '/fuwupingjia',
        name: '服务评价',
        component: fuwupingjia
      }
      ,{
	path: '/weixiufuwu',
        name: '维修服务',
        component: weixiufuwu
      }
      ,{
	path: '/weixiuyuan',
        name: '维修员',
        component: weixiuyuan
      }
      ,{
	path: '/systemintro',
        name: '系统简介',
        component: systemintro
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/shangmenfuwu',
        name: '上门服务',
        component: shangmenfuwu
      }
      ,{
	path: '/messages',
        name: '留言反馈',
        component: messages
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/newstype',
        name: '通知公告分类',
        component: newstype
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
