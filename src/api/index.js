// 导出配置好的axios提供给main.js使用
import axios from 'axios'

// 导入auth模块
import auth from '@/utils/auth'

// 进行axios的配置,将来写很多axios相关的配置
// ---基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// ---请求头
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`


export default axios
