// 导出配置好的axios提供给main.js使用
import axios from 'axios'

// 导入auth模块
import auth from '@/utils/auth'

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


export default axios
