<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-link @click="onBack" type="primary">返回评论列表</el-link>
    </div>
    <h3 v-text="data.art_title"></h3>
    <p v-text="data.art_pubdate"></p>
  </el-card>
</template>

<script>
export default {
  created () {
    this.loadData()
  },
  data () {
    return {
      // 响应数据
      data: {}
    }
  },
  methods: {
    // 返回列表
    onBack () {
      this.$router.push('/content/comment')
    },
    // 获取数据
    loadData () {
      this.$axios.get('/comments', {
        params: {
          type: 'a',
          source: this.$route.params.article
        }
      }).then(response => {
        // console.log(response.data)
        this.data = response.data.data
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '评论信息获取失败，请刷新',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style>

</style>
