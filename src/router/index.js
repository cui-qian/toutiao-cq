// 导出一个路由实例

// 导入路由
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import NotFound from '../views/404.vue'
import Article from '../views/Article.vue'
import Image from '../views/Image.vue'
import Publish from '../views/Publish.vue'
import Comment from '../views/Comment.vue'

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
            },
            {
                path: "/article",
                component: Article
            },
            {
                path: "/image",
                component: Image
            },
            {
                path: "/publish",
                component: Publish
            },
            {
                path: "/comment",
                component: Comment
            }
        ]
    },
    // 通配组件,如果路径不对,就跳转到404页面
    {
        path: '*',
        component: NotFound
    }
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
