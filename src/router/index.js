// 导出一个路由实例

// 导入路由
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'

// --导入auth模块
import auth from '@/utils/auth'
// 注册路由
Vue.use(VueRouter)
// 声明路由规则
const routes = [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: "/",
      component: Welcome
    }]
  },
]
// 初始化路由实例
const router = new VueRouter({
  routes
})

// --添加导航守卫
// to: 跳转的目标,路由对象
// from: 来自哪个路由
router.beforeEach((to, from, next) => {
  // 如果你访问的路径是出去登录外的路径并且此时没有登陆,就要拦截到登录页面,其他情况一概放行
  const user = auth.getUser();
  if (to.path !== '/login' && !user.token) return next('/login')
  next()
})


// 导出路由实例
export default router
