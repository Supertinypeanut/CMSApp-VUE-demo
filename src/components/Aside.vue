<template>
  <div class="aside">
      <div class="logo">
          <img src="../assets/img/logo_index.png" alt="">
      </div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#323745"
      text-color="#ADAFB5"
      active-text-color="#409eff;">
       <el-menu-item>
      <router-link slot="title" to="/home" index="4">
      首页</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item><router-link slot="title" to="/content/publish" index="2-1">发布文章</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/content/articles" index="2-2">内容列表</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/content/comment" index="2-3">评论管理</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/content/material" index="2-4">素材管理</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>粉丝管理</span>
        </template>
        <el-menu-item><router-link slot="title" to="/fans/data" index="3-1">图文数据</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/fans/survey" index="3-2">粉丝概况</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/fans/portrait" index="3-3">粉丝画像</router-link></el-menu-item>
        <el-menu-item><router-link slot="title" to="/fans/lists" index="3-4">粉丝列表</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item>
      <router-link slot="title" to="/account" index="4">
      账户信息</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.aside{
    height: 100vh;
    background-color: #323745;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: #000;
        img{
            width: 80%;
        }
    }
    // 剔出导航边框一像素
    .el-menu-vertical-demo.el-menu{
        border: 0;
    }
}
</style>
