import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
// 首页默认组件
import Main from '../views/home/Main'
// 进度条
import NProgress from 'nprogress'

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
        // 编辑文章
        path: '/content/publish/:channel_id',
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

// 启用导航卫士判别二次登录和开启nprogress加载条
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
    NProgress.done()
    return
  }
  localStorage.getItem('token') ? next() : next('/login')
})
// 关闭nprogress加载条
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
