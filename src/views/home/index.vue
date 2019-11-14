<template>
  <div>首页</div>
</template>

<script>
export default {
  created () {
    localStorage.getItem('token') ? this.loadData() : this.$router.replace('/login')
  },
  methods: {
    loadData () {
      alert('登入成功')
    }
  }
}
</script>

<style>

</style>
