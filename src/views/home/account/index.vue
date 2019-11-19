<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号信息</span>
    <el-button style="float:right;" @click="onEdit" type="primary" icon="el-icon-edit" circle></el-button>
  </div>
  <el-row>
    <el-col class="photo" :span="24">
      <el-avatar :size="80" :src="data.photo"></el-avatar>
      <el-upload
        :headers="headers"
        :disabled="isEdit"
        :on-change="onUpFile"
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
      isEdit: true,
      // 请求头
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  },
  methods: {
    // 获取用户数据
    loadData () {
      // 发送请求
      this.$axios.get('/user/profile')
        .then(response => {
          console.log(response.data)
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
      this.isEdit = !this.isEdit
    },
    onUpFile (file, files) {
      console.log(file, files)
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
