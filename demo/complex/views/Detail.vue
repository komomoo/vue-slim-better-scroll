<template>
  <div class="detail">
    <header class="header">
      <i class="allow-left-icon" @click="goBack"></i>
      Detail
    </header>

    <p class="deatil-content">index: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
  },
}
</script>

<style lang="stylus">
.detail {
  .deatil-content {
    margin-top 20px
    text-align center
  }
}
</style>
