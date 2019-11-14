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
       <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
     </div>
  </el-col>
  <!-- Badge 标记 -->
  <el-col :span="3">
    <el-dropdown trigger="click">
    <span class="el-dropdown-link">小花生<i class="el-icon-caret-bottom el-icon--right"></i></span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="clearfix">
          个人信息
          <el-badge class="mark" :value="12" />
        </el-dropdown-item>
        <el-dropdown-item class="clearfix">
        GitHub
        <el-badge class="mark" :value="3" />
        </el-dropdown-item>
        <!-- 分割线 -->
        <el-divider style="margin:0;"></el-divider>
        <el-dropdown-item class="clearfix">
        退出
        <el-badge class="mark" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
export default {

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
