<template>
  <el-container>
  <el-aside width="200px">
    <!-- 侧边栏组件 -->
    <home-aside></home-aside>
  </el-aside>
  <el-container>
    <el-header>
      <!-- 头部组件 -->
      <home-header></home-header>
    </el-header>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from './Aside'
import Header from './Header'

export default {
  created () {
    localStorage.getItem('token') ? this.loadData() : this.$router.replace('/login')
  },
  methods: {
    loadData () {
      this.$message({
        message: '登入成功',
        type: 'success'
      })
    }
  },
  components: {
    'home-aside': Aside,
    'home-header': Header
  }
}
</script>

<style lang="less" scoped>
.main{
  height: 100%;
  background-color: #f2f3f5;
}
</style>
