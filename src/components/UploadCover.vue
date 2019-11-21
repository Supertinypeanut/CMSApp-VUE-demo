<template>
  <div >
    <div class="el-upload" @click="onClickShow">
    <!-- 视图 -->
    <img v-if="value" :src="value" class="avatar">
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
          <el-tab-pane label="素材库" name="first">
            <!-- 素材列表按钮 -->
            <el-radio-group v-model="material.collect" style="margin-bottom:20px;">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 素材展示列表 -->
            <el-row :gutter="20">
              <template v-for="(item,index) in  materialData">
                <el-col :key="index" :span="6" class="currentImage">
                  <img @click="onGetCurrent(item)" :src="item.url" style="height:100px;" >
                </el-col>
              </template>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传文件" name="second">上传文件</el-tab-pane>
        </el-tabs>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onSave(false)">取 消</el-button>
        <el-button type="primary" @click="onSave(true)">确 定</el-button>
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
      activeName: 'first',
      // 素材库请求对象
      material: {
        collect: null,
        page: null,
        per_page: null
      },
      // 素材库响应数据
      materialData: [],
      // 当前选中对象
      currentItem: null
    }
  },
  created () {

  },
  methods: {
    // 获取素材数据
    getMaterial () {
      // 发送请求
      this.$axios.get('/user/images', { params: this.material })
        .then(response => {
          // console.log(response.data)
          this.materialData = response.data.data.results
        }).catch(() => {
          this.$message({
            message: `素材获取失败，请刷新`,
            type: 'error'
          })
        })
    },
    // 点击触发对话框
    onClickShow () {
      this.centerDialogVisible = true
      // 获取素材库数据
      this.getMaterial()
    },
    // 点击切换标签页触发
    handleClick () {
      // console.log(val, a, c)
    },
    // 获取当前对象
    onGetCurrent (item) {
      console.log(item)
      this.currentItem = item
    },
    // 是否上传
    onSave (done) {
      // 关闭对话框
      this.centerDialogVisible = false
      // 确定按钮
      if (done) {
        // 发布信息，触发在父组件中该组件的input事件
        this.$emit('input', this.currentItem.url)
      }
    }
  },
  watch: {
    // 监听素材库请求对象
    material: {
      handler () {
        this.getMaterial()
      },
      deep: true
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
    .currentImage{
      border: 2px solid #4a7;
    }
  }
</style>
