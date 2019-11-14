import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
// 首页默认组件
import Main from '../views/home/Main'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 首页
    path: '/home',
    component: Home,
    children: [
      // 首页默认组件
      {
        path: '',
        component: Main
      },
      {
        // 发布文章
        path: '/content/publish',
        component: () => import('../views/home/content/Publish.vue')
      },
      {
        // 文章列表
        path: '/content/articles',
        component: () => import('../views/home/content/Articles.vue')
      },
      {
        // 评论管理
        path: '/content/comment',
        component: () => import('../views/home/content/Comment.vue')
      },
      {
        // 素材管理
        path: '/content/material',
        component: () => import('../views/home/content/Material.vue')
      },
      {
        // 图文数据
        path: '/fans/data',
        component: () => import('../views/home/fans/Data.vue')
      },
      {
        // 粉丝概况
        path: '/fans/survey',
        component: () => import('../views/home/fans/Survey.vue')
      },
      {
        // 粉丝画像
        path: '/fans/portrait',
        component: () => import('../views/home/fans/Portrait.vue')
      },
      {
        // 粉丝列表
        path: '/fans/lists',
        component: () => import('../views/home/fans/Lists.vue')
      },
      {
        // 账户信息
        path: '/account',
        component: () => import('../views/home/account')
      }
    ]
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
