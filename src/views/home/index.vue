<template>
  <el-container>
  <el-aside width="200px">
    <home-aside></home-aside>
  </el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from './Aside'

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
    'home-aside': Aside
  }
}
</script>

<style>

</style>
