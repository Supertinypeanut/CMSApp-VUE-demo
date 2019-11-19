<template>
  <el-card
    v-loading="loading"
    class="box-card"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  <div slot="header" class="clearfix">
    <span>素材管理</span>
  </div>
  <!--全部/收藏按钮 -->
  <div style="margin-bottom:20px;">
    <el-radio-group v-model="query.collect">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-upload
    style="float:right;margin-top:-20px;"
     :headers="headers"
     :before-upload="onUpFile"
     :on-success="onUpSuccess"
     class="upload-demo"
     ref="upload"
     name="image"
     :show-file-list="false"
     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
     >
     <el-button style="margin:20px;" slot="trigger" size="small" type="primary">上传素材</el-button>
   </el-upload>
  </div>
  <el-row :gutter="20">
    <el-col style="margin-bottom:20px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(item, index) in data.results" :key="index" >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.url" class="image">
        <div class="bottom clearfix">
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
      },
      // loading效果开关
      loading: false,
      // 请求头
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  },
  methods: {
    // 获取数据
    loadImage () {
      // 开启loading效果
      this.loading = true
      // 请求数据
      this.$axios.get('/user/images', { params: this.query }).then(response => {
        // console.log(response.data.data)
        this.data = response.data.data
        // 关闭loading效果
        this.loading = false
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
    },
    // 上传前
    onUpFile () {
      this.loading = true
      this.loadImage()
    },
    // 上传成功刷新
    onUpSuccess () {
      this.loading = false
      this.$message({
        showClose: true,
        message: '素材上传成功',
        type: 'success'
      })
      this.loadImage()
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
