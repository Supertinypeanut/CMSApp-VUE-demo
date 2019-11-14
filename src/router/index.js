import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 首页
    path: '/home',
    component: Home
  },
  {
    // 登入页
    path: '/login',
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
