<template>
  <el-row type="flex" class="header" :gutter="20">
  <el-col class="icon" :span="1"><i class="el-icon-s-fold"></i></el-col>
  <el-col :span="10">厦门乐豆筝舍教育服务有限公司</el-col>
  <!-- 输入框 -->
  <el-col :span="7"><el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input></el-col>
  <!-- Tooltip -->
  <el-col :span="2">
    <el-tooltip content="消息" placement="bottom" effect="dark">
  <span style="border:none;">消息</span>
</el-tooltip>
  </el-col>
  <!-- 头像 -->
  <el-col :span="2">
     <div class="demo-type">
       <el-avatar :src="user.photo"></el-avatar>
     </div>
  </el-col>
  <!-- Badge 标记 -->
  <el-col :span="3">
    <el-dropdown trigger="click">
    <span class="el-dropdown-link">{{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="clearfix">
           <router-link to="/account">个人信息</router-link>
          <el-badge class="mark" :value="12" />
        </el-dropdown-item>
        <el-dropdown-item class="clearfix">
        <a href="https://github.com/Supertinypeanut">GitHub</a>
        <el-badge class="mark" :value="3" />
        </el-dropdown-item>
        <!-- 分割线 -->
        <el-divider style="margin:0;"></el-divider>
        <el-dropdown-item @click.native="onExit" class="clearfix">
        退出
        <el-badge class="mark" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
// 引入公共Vue实例
import EventBus from '@/utils/event-bus'
export default {
  // 获取用户数据
  created () {
    // 获取用户信息
    this.getUser()
    // 订阅修改用户信息组件事件
    EventBus.$on('updataUser', (user) => {
      // 更新该组件user信息
      this.user = user
    })
  },
  data () {
    return {
      // 用户信息响应对象
      user: {}
    }
  },
  methods: {
    // 获取用户信息
    getUser () {
      this.$axios.get('/user/profile')
        .then(response => {
          // console.log(response.data)
          this.user = response.data.data
        }).catch(() => {
          this.$message({
            type: 'waring',
            message: '用户个人信息获取异常'
          })
        })
    },
    // 退出登录按钮
    onExit () {
      this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear('token')
        this.$router.push('/login')
        this.$message({
          message: '退出成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header{
    align-items: center;
    height: 60px;
    .icon{
        font-size: 26px;
    }
}
// 清除分割线上下margin
.el-divider.el-divider--horizontal{
    margin: 0;
}
</style>
