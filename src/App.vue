<template>
  <div id="app">
    <header class="header" @click="scrollToTop()">点我回到顶部</header>

    <scroll
      ref="scroll"
      :data="[list]"
      class="common-content"
      @pullingDown="refresh()"
      @pullingUp="loadMore()">
      <div class="scroll-content">
        <ul>
          <li v-for="(item, index) in list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </scroll>

  </div>
</template>

<script>
import Scroll from './components/Scroll'

export default {
  name: 'App',
  components: {
    Scroll,
  },
  data () {
    return {
      list: ['下拉即可刷新', '上拉触发加载更多'],
      page: 1,
      pageSize: 10,
    }
  },
  watch: {
    startY () {
      this.rebuildScroll()
    },
  },
  mounted () {
    this.refresh()
  },
  methods: {
    rebuildScroll () {
      this.$nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    scrollToTop () {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    refresh () {
      this._getList().then(data => {
        // 初始化数据
        this.list = data
        this.page = 1
      })
    },
    loadMore () {
      this._getNextPage().then(data => {
        this.list.push(...data)

        data.length < this.pageSize ? this.$refs.scroll.forceUpdate(false) : this.page++ // 是否已到达最后一页?
      })
    },

    _getList () {
      let page = 1
      let pageSize = this.pageSize
      // 模拟数据请求
      return new Promise(resolve => {
        setTimeout(() => {
          let arr = []
          for (let i = 0; i < pageSize; i++) {
            arr.push(`第${page}页的数据`)
          }
          resolve(arr)
        }, 1000)
      })
    },
    _getNextPage () {
      let nextPage = this.page + 1
      let pageSize = this.pageSize
      // 模拟请求下一页
      return new Promise(resolve => {
        setTimeout(() => {
          let arr = []
          if (nextPage < 4) {
            for (let i = 0; i < pageSize; i++) {
              arr.push(`第${nextPage}页的数据`)
            }
          } else {
            // 模拟已到达最后一页
            for (let i = 0; i < 8; i++) {
              arr.push(`第${nextPage}页的数据,已到达最后一页`)
            }
          }
          resolve(arr)
        }, 1000)
      })
    },
  },
}
</script>

<style lang="stylus">
$headerHeight = 44px
$mainColor = #6A9FB5
$bgColor = #FAFAFA

html, body {
  width 100%
  height 100%
  overflow hidden
}

#app {
  width 100%
  height 100%
  overflow hidden
  box-sizing border-box
  .header {
    position absolute
    top 0
    left 0
    right 0
    text-align center
    z-index 100
    height $headerHeight
    line-height $headerHeight
    color #fff
    background $mainColor
  }
  // 公共内容盒子
  .common-content {
    position absolute
    top $headerHeight !important
    left 0
    right 0
    bottom 0
    background-color $bgColor
    overflow hidden
    box-sizing border-box
    .ios & {
      top ($headerHeight + 20px) !important
    }
    .scroll-content {
      box-sizing border-box
      ul {
        margin 0
        padding 0
        li {
          background #fff
          height 44px
          line-height 44px
          text-align center
          color $mainColor
          border-bottom 1px solid #eee
        }
      }
    }
  }
}
</style>
