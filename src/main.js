import Vue from 'vue'
import App from './App.vue'
import router from './router'

// ElementUI需要导入的内容
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './style/index.less'

// 顶部进度条
import '../node_modules/nprogress/nprogress.js'
import '../node_modules/nprogress/nprogress.css'

// json-bigint
import JSONbig from 'json-bigint'

import axios from 'axios'

// 初始化ElementUI组件库
Vue.use(ElementUI)
Vue.config.productionTip = false

// 设置请求接口基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头携带token
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
// 处理响应参数-js最大数限制
axios.defaults.transformResponse = [
  function (data) {
    // 防止返回参数为空程序出错
    try {
      data = JSONbig.parse(data)
      return data
    } catch (error) {
      return {}
    }
  }
]

// 挂载axios到实例
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
