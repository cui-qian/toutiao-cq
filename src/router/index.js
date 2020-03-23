// 导出一个路由实例

// 导入路由
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
// 注册路由
Vue.use(VueRouter)
// 声明路由规则
const routes = [{
  path: '/login',
  component: Login
}]
// 初始化路由实例
const router = new VueRouter({
  routes
})
// 导出路由实例
export default router
