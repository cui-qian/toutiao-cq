// 这时管理用户信息,身份认证信息,操作函数相关

// 1.确认本地存储用户信息的方式 : sessionStorage
//   1.1 原因: 关闭浏览器之后,登录失效,也提供了便利的api函数
// 2.sessionStorage.setItem('数据名字','字符串类型数据')
//   2.1数据的名字定义成常量,数据格式:json格式的字符串

const KEY = 'shijienameda-cuiqian-xiangkan'

// 设置用户信息
// user:数据类型是object
const setUser = (user) => {
  window.sessionStorage.setItem(KEY, JSON.stringify(user))
}

// 获取用户信息
const getUser = () => {
  // 如果KEY对应没有信息，你获取的是null，你可以执行的代码：getUser().id 报错
  return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}

// 删除用户信息
const delUser = () => {
  window.sessionStorage.removeItem(KEY)
}

export default {
  setUser,
  getUser,
  delUser
}
