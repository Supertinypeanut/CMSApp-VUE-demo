<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>素材管理</span>
  </div>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in data.results" :key="index" >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.url" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</el-card>

</template>

<script>
export default {
  created () {
    this.loadImage()
  },
  data () {
    return {
      // 响应参数对象
      data: {}
    }
  },
  methods: {
    // 获取数据
    loadImage () {
      this.$axios.get('/user/images').then(response => {
        console.log(response.data.data)
        this.data = response.data.data
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '素材获取失败，请刷新',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  .image{
    width: 100%;
    height: 250px;
    display: block;
  }
}
</style>
