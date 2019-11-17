<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发表文章</span>
    </div>
    <el-form ref="formData" :model="formData" label-width="80px">
     <el-form-item label="文章标题:">
       <el-input v-model="formData.title"></el-input>
     </el-form-item>
     <el-form-item label="频道:">
       <el-select v-model="formData.channel_id" placeholder="请选择">
         <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="封面">
       <el-radio-group v-model="formData.cover.type">
         <el-radio :label="0">无图</el-radio>
         <el-radio :label="1">单面</el-radio>
         <el-radio :label="3">三图</el-radio>
         <el-radio :label="-1">自动</el-radio>
       </el-radio-group>
     </el-form-item>
     <el-form-item label="内容">
       <!-- <el-input type="textarea" v-model="formData.content"></el-input> -->
       <quillEditor v-model="formData.content"></quillEditor>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="onSubmit(formData.draft =false)">发表</el-button>
       <el-button @click="onSubmit(formData.draft = true)">存入草稿</el-button>
     </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
// 导入富文本编辑器
import '../../../../node_modules/quill/dist/quill.core.css'
import '../../../../node_modules/quill/dist/quill.snow.css'
import '../../../../node_modules/quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'publish',
  data () {
    return {
      // 提交数据对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null,
        draft: false
      },
      // 频道列表数据
      channels: []
    }
  },
  created () {
    // 获取文章频道列表
    this.$axios.get('/channels').then(response => {
      this.channels = response.data.data.channels
    }).catch(() => {
      this.$message({
        message: '文章频道获取失败,请重新刷新',
        type: 'warning'
      })
    })
  },
  methods: {
    // 发表或存入草稿
    onSubmit (draft) {
      this.$axios.post('articles', this.formData).then(response => {
        this.$message({
          message: '文章发表成功',
          type: 'success'
        })
        // 跳回内容列表
        this.$router.push('/content/articles')
      }).catch(() => {
        this.$message({
          message: '文章发表失败',
          type: 'error'
        })
      })
    }
  },
  components: {
    quillEditor
  }
}
</script>
<style lang="less" scoped>
.box-card {
  .clearfix:before
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}
</style>
