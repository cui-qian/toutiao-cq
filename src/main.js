import Vue from 'vue';
// 导入核心js包
import ElementUI from 'element-ui';
// 导入核心样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入路由实例
import router from './router/index'
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
  //挂载路由实例
  router
});
