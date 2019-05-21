<template>
  <div class="home">
    <header class="header" @click="scrollToTop">Home</header>

    <Scroll
      ref="scroll"
      v-loading="loading"
      :update-data="[list]"
      :refresh-data="[]"
      class="content"
      @pullingDown="loadRefresh"
      @pullingUp="loadMore">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="goDetail(index)">
          {{ item }}
          <i class="allow-right-icon"></i>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../../src'
import { timeout } from '../../../src/Scroll/utils'

export default {
  name: 'Home',
  components: {
    Scroll,
  },
  data () {
    return {
      list: [],
      loading: false,
    }
  },
  created () {
    // 不会引起DOM变化的数据在此定义
    this.page = 1
    this.pageSize = 20
  },
  async mounted () {
    this.loading = true
    await this.loadRefresh()
    this.loading = false
  },
  methods: {
    // 滚动到顶部
    scrollToTop () {
      this.$refs.scroll.scrollToTop()
    },
    // 滚动到底部
    scrollToBottom () {
      this.$refs.scroll.scrollToBottom()
    },
    // 加载刷新数据
    async loadRefresh () {
      const data = await this._fetchList()

      // 初始化数据
      this.list = data
      this.page = 1
    },
    // 加载更多数据
    async loadMore () {
      const page = this.page + 1
      const data = await this._fetchList(page)

      this.list.push(...data)
      data.length < this.pageSize ? this.$refs.scroll.update(true) : this.page++ // 判断是否已达最后一页?如果已是最后一页，可调用this.$refs.scroll.update(true)关闭上拉
    },

    // 模拟一个异步获取列表操作
    async _fetchList (page = 1, pageSize = this.pageSize) {
      try {
        await timeout(1000)

        if (page < 3) {
          // 模拟数据返回
          return Array.from({ length: pageSize }, (value, index) => `第${page}页的数据${index},点我(｡･ω･)ﾉﾞ`)
        } else {
          // 模拟已到达最后一页时的数据返回
          return Array.from({ length: pageSize / 2 }, (value, index) => `最后一页,第${page}页的数据${index},点我(｡･ω･)ﾉﾞ`)
        }
      } catch (e) {
        return false
      }
    },

    // 跳转详情页
    goDetail (id) {
      this.$router.push({
        name: 'detail',
        params: { id },
      })
    },
  },
}
</script>
