<template>
  <div class="app">
    <keep-alive>
      <router-view class="child-view"/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="stylus">
$headerHeight = 44px
$baseColor = #6A9FB5
$bgColor = #FAFAFA

* {
  padding 0
  margin 0
}

html, body {
  width 100%
  height 100%
  overflow hidden
}

.app {
  width 100%
  height 100%
  overflow hidden
  box-sizing border-box
  display flex
  flex-direction column
  .header {
    flex 0 0 $headerHeight
    line-height $headerHeight
    text-align center
    color #fff
    background $baseColor
  }
  .footer {
    flex 0 0 $headerHeight
    line-height $headerHeight
    text-align center
    color #fff
    background $baseColor
  }
  .content {
    flex 1
    background-color $bgColor
    overflow hidden
    box-sizing border-box
    ul {
      li {
        background #fff
        height 44px
        line-height 44px
        text-align center
        color $baseColor
        border-bottom 1px solid #eee
      }
    }
  }
}
</style>
