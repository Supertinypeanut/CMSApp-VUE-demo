<template>
<!--自定义封装的文章频道组件 -->
  <el-select :value="value" @input="onInput" placeholder="请选择">
    <!-- 渲染文章列表 -->
    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  created () {
    this.getChannels()
  },
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      // 文章频道
      channels: []
    }
  },
  methods: {
    // 获取文章频道
    getChannels () {
      this.$axios.get('channels').then(response => {
        // console.log(response.data)
        this.channels = response.data.data.channels
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '文章频道获取失败,请重新刷新',
          type: 'warning'
        })
      })
    },
    onInput (val) {
      // 为组件定义input事件属性
      this.$emit('input', val)
    }
  }
}
</script>

<style>

</style>
