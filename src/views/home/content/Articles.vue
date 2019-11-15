<template>
  <div class="articles">
    <!-- 卡片 -->
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
  </div>
</template>

<script>
export default {
  name: 'articles',
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
      }
    }
  },
  watch: {
    date () {
      this.formData.begin_pubdate = this.date[0]
      this.formData.end_pubdate = this.date[1]
    }
  }
}
</script>

<style>

</style>
