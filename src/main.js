import Vue from 'vue';
// 导入核心js包
import ElementUI from 'element-ui';
// 导入核心样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入路由实例
import router from './router/index'
import App from './App.vue';

// 导入配置好的axios
// @代表src的绝对路径,vue-cli下才可使用
import axios from '@/api'

// 导入公用样式
import '@/styles/index.less'



// 使用自己封装的插件
import plugin from '@/utils/plugin'
Vue.use(plugin)

// 挂载axios
Vue.prototype.$http = axios

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App),
    //挂载路由实例
    router
});


// main.js的职责
// 1.负责导入项目中需要依赖的资源
// 2.初始化根实例
