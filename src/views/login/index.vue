<template>
  <div class="login">
    <!-- 卡片 -->
    <div class="box-card el-card__body">
      <!-- logo -->
      <div class="logo">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form :model="formData" :rules="rules" ref="formData" style="margin-top:20px">
        <!-- 手机号 -->
        <el-form-item required prop="mobile" class="demo-ruleForm">
          <el-input v-model="formData.mobile" placeholder="输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item required prop="code">
          <!-- layout布局 -->
          <el-row type="flex" justify="space-between">
            <el-col :span="17"><el-input v-model="formData.code" placeholder="输入验证码"></el-input></el-col>
            <el-col :span="6"><el-button plain>获取验证码</el-button></el-col>
          </el-row>
          <!-- 用户勾选 -->
        </el-form-item>
          <el-form-item required prop="checked">
          <el-checkbox v-model="formData.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')" style="width:100%">完成</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 因为required只能校验null、undifined和空字符串，不会检测true/false，所以需要使用自自定义校验函数
    const validator = (rule, value, callback) => {
      value ? callback() : callback(new Error('未勾选用户协议和隐私条款'))
    }
    return {
      formData: {
        mobile: '',
        code: '',
        checked: false
      },
      // 表单校验规则
      rules: {
        mobile: [{ required: true, message: '电话号码为空' }, { pattern: /^1[35678]\d{9}$/, message: '电话号码格式不正确' }],
        code: [{ required: true, message: '验证码为空' }, { pattern: /^\d{6}$/, message: '验证码位数不对' }],
        checked: [{ validator }]
      }
    }
  },
  methods: {
    // 整个表单验证
    submitForm (formData) {
      // 通过$refs获取对应的节点
      this.$refs[formData].validate((valid) => {
        if (valid) {
          // 向服务器发送校验请求，判断手机号和验证码是否正确
          this.$axios.post('/authorizations', this.formData).then(response => {
            // 持久化token
            localStorage.setItem('token', response.data.data.token)
            // 跳转到后台主页
            this.$router.push('/home')
          }).catch(() => {
            this.$message.error('错了哦，请确认手机号和验证码')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  .logo{
    text-align: center;
    img{
      width: 50%
    }
  }
  height: 100vh;
  background: url('../../assets/img/login_bg.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
   .box-card {
    width: 480px;
    height: 360px;
    background-color: #fff;
  }
}
</style>
