<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-link @click="onBack" type="primary">返回评论列表</el-link>
    </div>
    <h3 v-text="data.art_title"></h3>
    <p v-text="data.art_pubdate"></p>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
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
      data: {},
      // 评论数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
        console.log(response.data.data)
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
