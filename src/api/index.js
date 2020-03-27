// 导出配置好的axios提供给main.js使用
import axios from 'axios'

// 导入auth模块
import auth from '@/utils/auth'

// 导入router
import router from '../router/index'

// 进行axios的配置,将来写很多axios相关的配置
// ---基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// ---请求头,配置token(这句代码只会在页面刷新的时候执行)
//axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`


// 请求拦截器 (在每次请求前都会执行)
axios.interceptors.request.use(config => {
    // 修改请求头配置, 追加上token
    // 做判断-->本地存储了token就追加token,如果本地没有token就不追加了
    const {
        token
    } = auth.getUser(); //解构出token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, err => Promise.reject(error))

// 响应拦截器
axios.interceptors.response.use(res => {
    // 对响应数据做点什么
    return res;
}, err => {
    // 对响应错误做点什么
    // 必须return一个promise
    // 需求:判断401状态码, 清除本地用户信息,跳转到登录页面
    // 1.获取响应状态码,在响应报文中   statusCode===err.respones.status
    // 1.1.响应报文对象
    if (err.response && err.response.status === 401) {
        // 2.清除本地token
        auth.delUser()
        // 3.跳转到登录页面
        // 在vue实例下,才可以使用this.$router.push('/login') 进行跳转
        // 所以在这里不能通过组件实例访问$router这个对象,使用其push对象
        // 方案1:window.location.href='http://localhost:8080/#/login'   (不建议)
        // 方案2:window.location.hash='#/login'   (不建议)
        // 以上方案不建议:通过location直接修改地址,可能导致路由有些功能无法触发
        // $router 其实就是是 new VueRouter() 的实例对象,所以路由实例也可以调用push函数 (导入router模块)
        router.push('/login')
    }
    return Promise.reject(err);
});

export default axios
