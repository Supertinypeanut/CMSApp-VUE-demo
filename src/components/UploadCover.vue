<template>
  <div >
    <div class="el-upload" @click="centerDialogVisible = true">
    <!-- 视图 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!-- 对话框 -->
    <el-dialog
      title="请选择需要上传的图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <!-- 图片可选模块 -->
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
          <el-tab-pane label="上传文件" name="second">上传文件</el-tab-pane>
        </el-tabs>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 控制对话框是否弹出
      centerDialogVisible: false,
      // 上传的URL
      imageUrl: '',
      // 选中的标签页
      activeName: 'first'
    }
  },
  methods: {
    // 点击切换标签页触发
    handleClick () {
      // console.log(val, a, c)
    }
  }
}
</script>

<style lang="less" scoped>
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover{
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
