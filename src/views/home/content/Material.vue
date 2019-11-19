<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>素材管理</span>
  </div>
  <!--全部/收藏按钮 -->
  <div style="margin-bottom:20px;">
    <el-radio-group v-model="query.collect">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
  </div>
  <el-row :gutter="20">
    <el-col style="margin-bottom:20px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(item, index) in data.results" :key="index" >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.url" class="image">
        <div v-show="!query.collect" class="bottom clearfix">
          <!-- 星星是否收藏 -->
          <i @click="onChangeStar(item)" :class="{'el-icon-star-off' : !item.is_collected ,'el-icon-star-on':item.is_collected}"></i>
          <i @click="onDelete(item)" class="el-icon-delete-solid"></i>
        </div>
      </el-card>
    </el-col>
  </el-row>
</el-card>

</template>

<script>
export default {
  name: 'Material',
  created () {
    this.loadImage()
  },
  data () {
    return {
      // 响应参数对象
      data: {},
      // 请求参数对象
      query: {
        // 全部/收藏按钮类型
        collect: false,
        page: null,
        per_page: null
      }
    }
  },
  methods: {
    // 获取数据
    loadImage () {
      this.$axios.get('/user/images', { params: this.query }).then(response => {
        // console.log(response.data.data)
        this.data = response.data.data
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '素材获取失败，请刷新',
          type: 'warning'
        })
      })
    },
    // 点击星星更改收藏状态
    onChangeStar (item) {
      // console.log(item)
      // 发送请求
      this.$axios.put(`user/images/${item.id}`, { collect: !item.is_collected }).then(response => {
        this.$message({
          showClose: true,
          message: `${!item.is_collected ? '收藏' : '取消收藏'}成功,可以到收藏列表查看`,
          type: 'success'
        })
        // 更新页面
        this.loadImage()
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '收藏失败,请刷新页面',
          type: 'warning'
        })
      })
    },
    // 删除按钮
    onDelete (item) {
      // 弹框提醒
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求
        this.$axios.delete(`user/images/${item.id}`).then(response => {
          this.$message({
            showClose: true,
            message: `删除成功`,
            type: 'success'
          })
          // 更新页面
          this.loadImage()
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '删除失败,请刷新页面',
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    // 监听请求参数对象
    query: {
      deep: true,
      handler () {
        this.loadImage()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  .image{
    width: 100%;
    height: 200px;
    display: block;
  }
  .bottom{
    display: flex;
    justify-content: space-evenly;
    height:40px;
    align-items: center;
    background-color: #ccc;
    font-size: 25px;
      .el-icon-star-on{
      color: rgb(245, 233, 143);
    }
  }
}
</style>
