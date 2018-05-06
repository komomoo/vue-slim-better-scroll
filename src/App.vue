<template>
  <div id="app">
    <header class="header" @click="scrollToTop()">点我回到顶部</header>

    <scroll
      ref="scroll"
      class="content"
      @pullingDown="loadRefresh()"
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
import { timeout } from './components/Scroll/utils'

export default {
  name: 'App',
  components: {
    Scroll,
  },
  data () {
    return {
      list: [],
      page: 1,
      pageSize: 10,
    }
  },
  mounted () {
    this.loadRefresh()
  },
  methods: {
    // 滚动到顶部
    scrollToTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 加载刷新数据
    async loadRefresh () {
      const data = await this._fetchList()

      // 初始化数据
      this.list = data
      this.page = 1

      this.$refs.scroll.update()
    },
    // 加载更多数据
    async loadMore () {
      const page = this.page + 1
      const data = await this._fetchList(page)

      this.list.push(...data)
      data.length < this.pageSize ? this.$refs.scroll.update(true) : this.page++ // 判断是否已到达最后一页
    },

    // 模拟一个异步获取列表操作
    async _fetchList (page = 1, pageSize = this.pageSize) {
      try {
        await timeout(1000)

        if (page < 4) { // 模拟数据返回
          return Array.from({length: pageSize}, (value, index) => `第${page}页的数据${index}`)
        } else { // 模拟已到达最后一页时的数据返回
          return Array.from({length: pageSize / 2}, (value, index) => `第${page}页的数据${index},最后一页`)
        }
      } catch (e) {
        return false
      }
    },
  },
}
</script>

<style lang="stylus">
$headerHeight = 44px
$baseColor = #6A9FB5
$bgColor = #FAFAFA

* {
  padding: 0
  margin: 0
}

html, body {
  width: 100%
  height: 100%
  overflow: hidden
}

#app {
  width: 100%
  height: 100%
  overflow: hidden
  box-sizing: border-box
  display: flex
  flex-direction: column
  .header {
    flex: 0 0 $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $baseColor
    .ios & {
      padding-top: 20px
    }
  }
  .content {
    flex: 1
    background-color: $bgColor
    overflow: hidden
    box-sizing: border-box
    .scroll-content {
      box-sizing: border-box
      ul {
        margin: 0
        padding: 0
        li {
          background: #fff
          height: 44px
          line-height: 44px
          text-align: center
          color: $baseColor
          border-bottom: 1px solid #eee
        }
      }
    }
  }
}
</style>
