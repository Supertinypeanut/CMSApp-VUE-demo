<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号信息</span>
    <el-button style="float:right;margin-top:-10px;" @click="onEdit" type="primary" icon="el-icon-edit" circle></el-button>
  </div>
  <el-row>
    <el-col class="photo" :span="24">
      <!-- 头像 -->
      <el-avatar :size="80" :src="data.photo"></el-avatar>
      <el-upload
        :disabled="isEdit"
        :http-request="upFileMethod"
        class="upload-demo"
        ref="upload"
        name="photo"
        :show-file-list="false"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
        >
        <el-button style="margin:20px;" slot="trigger" size="small" type="primary">更换头像</el-button>
      </el-upload>
    </el-col>
  </el-row>
    <!-- 表单 -->
    <el-form :disabled="isEdit" :model="data" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="称昵" prop="name">
        <el-input type="text" v-model="data.name" ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input type="text" v-model="data.intro" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="text" v-model="data.mobile" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="data.email" ></el-input>
      </el-form-item>
    </el-form>
</el-card>
</template>

<script>
// 引入公共Vue实例
import EventBus from '@/utils/event-bus'
export default {
  created () {
    // 数据初始化
    this.loadData()
  },
  data () {
    return {
      // 响应数据
      data: {},
      // 是否开启编辑
      isEdit: true
    }
  },
  methods: {
    // 获取用户数据
    loadData () {
      // 发送请求
      this.$axios.get('/user/profile')
        .then(response => {
          // console.log(response.data)
          this.data = response.data.data
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '素材获取失败，请刷新',
            type: 'warning'
          })
        })
    },
    // 编辑按钮
    onEdit () {
      // 控制编辑开关
      this.isEdit = !this.isEdit
      // 关闭编辑时，保存发送请求
      if (this.isEdit) {
        this.$axios.patch('/user/profile', this.data)
          .then(response => {
            // console.log(response.data)
            this.$message({
              showClose: true,
              message: '信息修改成功',
              type: 'success'
            })
            // 发布订阅在头部组件的updataUser事件
            EventBus.$emit('updataUser', this.data)
          }).catch(() => {
            this.$message({
              showClose: true,
              message: '编辑失败，请重新刷新',
              type: 'warning'
            })
          })
      }
    },
    onUpFile (file, files) {
      console.log(file, files)
    },
    // 自定义上传方法
    upFileMethod (val) {
      // console.log(val)
      const FD = new FormData()
      FD.append('photo', val.file)
      this.$axios({
        method: 'patch',
        url: 'user/photo',
        data: FD
      }).then(response => {
        // console.log(response.data.data.photo)
        // 更新data对象photo
        this.data.photo = response.data.data.photo
        this.$message({
          showClose: true,
          message: '头像更改成功',
          type: 'success'
        })
        this.loadData()
        // 发布订阅在头部组件的updataUser事件
        EventBus.$emit('updataUser', this.data)
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '头像上传失败，请刷新',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  .photo{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
