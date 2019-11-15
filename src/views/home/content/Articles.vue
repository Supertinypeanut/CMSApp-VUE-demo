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
            <el-radio label="全部" value=""></el-radio>
            <el-radio label="草稿" value="0"></el-radio>
            <el-radio label="待审核" value="1"></el-radio>
            <el-radio label="审核通过" value="2"></el-radio>
            <el-radio label="审核失败" value="4"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="formData.channel_id" placeholder="请选择">
            <el-option label="ios" value="0"></el-option>
            <el-option label="c++" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期选择器 -->
        <el-form-item label="时间范围:">
          <el-date-picker
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
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card lists" style="margin-top:10px;">
      <div slot="header" class="clearfix">
        <span>共找到<i>59893</i>条符合条件的内容</span>
      </div>
      <!-- 表格 -->
      <el-table
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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'articles',
  created () {
    // 获取列表数据
    this.$axios.get('articles', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(response => {
      console.log(response.data)
      this.tableData = response.data.data.results
    }).catch(() => {
      this.$message({
        showClose: true,
        message: '数据获取失败,请重新刷新',
        type: 'warning'
      })
    })
  },
  data () {
    return {
      // 范围时间对象
      date: '',
      // 提交数据
      formData: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: '',
        per_page: '',
        response_type: ''
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
      ]
    }
  },
  watch: {
    // 获取开始和结束时间
    date () {
      this.formData.begin_pubdate = this.date[0]
      this.formData.end_pubdate = this.date[1]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
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
