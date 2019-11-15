<template>
  <div class="aside">
      <div class="logo">
          <img src="../assets/img/logo_index.png" alt="">
      </div>
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#323745"
      text-color="#ADAFB5"
      active-text-color="#fff"
      router
      >
       <el-menu-item index="1" route="/home">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item index="2-1" route="/content/publish">发布文章</el-menu-item>
        <el-menu-item index="2-2" route="/content/articles">内容列表</el-menu-item>
        <el-menu-item index="2-3" route="/content/comment">评论管理</el-menu-item>
        <el-menu-item index="2-4" route="/content/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="3-1" route="/fans/data">图文数据</el-menu-item>
        <el-menu-item index="3-2" route="/fans/survey">粉丝概况</el-menu-item>
        <el-menu-item index="3-3" route="/fans/portrait">粉丝画像</el-menu-item>
        <el-menu-item index="3-4" route="/fans/lists">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4" route="/account">账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.aside{
    overflow: hidden;
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
        .el-menu-item.is-active{
        background-color: rgb(40, 162, 202)!important;
      }
    }
}
</style>
