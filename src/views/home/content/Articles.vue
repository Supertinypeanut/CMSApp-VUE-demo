<template>
  <div class="articles">
    <!-- 卡片  全部图文-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 表单 -->
      <el-form ref="formData"  label-width="80px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="formData.status">
          <!-- 数据为null时，axios不会发送该参数 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <channels v-model="formData.channel_id" ></channels>
        </el-form-item>
        <!-- 日期选择器 -->
        <el-form-item label="时间范围:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card lists" style="margin-top:10px;">
      <div slot="header" class="clearfix">
        <span>共找到{{this.total_count}}条符合条件的内容</span>
      </div>
      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="封面"
          width="180">
          <template slot-scope="scope">
            <div class="block"><el-avatar shape="square" :size="50" :src="scope.row.cover.images[0]"></el-avatar></div>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          width="180">
          <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-tag
              :type="items[scope.row.status].type"
              effect="plain">
              {{ items[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          width="180">
          <template slot-scope="scope">
            <p>{{scope.row.pubdate}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-row type="flex" class="row-bg" justify="center">
        <el-pagination
          :disabled="loading"
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total_count">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 导入封装文章状态组件
import channels from '@/components/Channels'
export default {
  name: 'articles',
  created () {
  //  数据获取
    this.loadData()
  },
  data () {
    return {
      // 范围时间对象
      date: '',
      // 提交数据
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: null,
        response_type: null
      },
      // 时间选择器
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 表格数据
      tableData: [],
      // Tag标签
      items: [
        { type: 'warning', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'danger', label: '审核失败' },
        { type: 'info', label: '已删除' }
      ],
      // 表格加载
      loading: true,
      // 文章数
      total_count: 0
    }
  },
  watch: {
    // 获取开始和结束时间
    date: {
      handler () {
        // 移除时间，让时间初始化，否者将传空字符串
        if (this.date) {
          this.formData.begin_pubdate = this.date[0]
          this.formData.end_pubdate = this.date[1]
        } else {
          this.formData.begin_pubdate = null
          this.formData.end_pubdate = null
        }
      },
      deep: true
    },
    // 筛选数据
    formData: {
      handler () {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    loadData () {
      // 开启加载
      this.loading = true
      // 获取表格数据
      this.$axios.get('/articles', { params: this.formData })
        .then(response => {
          this.tableData = response.data.data.results
          // 获取文章总数
          this.total_count = response.data.data.total_count
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '数据获取失败,请重新刷新',
            type: 'warning'
          })
        }).finally(() => {
          // 关闭加载
          this.loading = false
        })
      // 获取文章频道
      // this.getChannels()
    },
    // 编辑按钮
    handleEdit (index, row) {
      // console.log(index, row)
      this.$router.push(`/content/publish?target=${this.$JSONbig.parse(row.id)}`)
    },
    // 删除按钮
    handleDelete (index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除文章请求
        this.$axios.delete(`articles/${row.id}`)
          .then(response => {
            this.$message({
              type: 'success',
              message: response.message
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页功能
    handleCurrentChange (val) {
      this.formData.page = val
      this.loadData()
    }
  },
  components: {
    // 文章频道组件
    channels
  }
}
</script>

<style lang="less" scoped>
.articles{
  .lists{
    .el-card__header{
      border-bottom-style: dashed!important;
    }
  }
}
</style>
