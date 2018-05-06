/**
 * better-scroll vue封装
 * @Author momoko
 * @Date 2017/10/13
 */

<template>
  <div ref="scroll" class="scroll">
    <div class="scroll-wrapper">
      <div ref="scrollContent" class="scroll-content">
        <slot/>
      </div>

      <slot
        :pullUp="pullUp"
        :pullUpNow="pullUpNow"
        name="pullup"
      >
        <div v-if="pullUp" class="pullup-wrapper">
          <div v-if="!pullUpNow" class="before-trigger">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div v-else class="after-trigger">
            <Loading/>
          </div>
        </div>
      </slot>
    </div>

    <slot
      :pullDown="pullDown"
      :pullDownStyle="pullDownStyle"
      :pullDownBefore="pullDownBefore"
      :pullDownNow="pullDownNow"
      :bubbleY="bubbleY"
      name="pulldown"
    >
      <div v-if="pullDown" ref="pulldown" :style="pullDownStyle" class="pulldown-wrapper">
        <div v-if="pullDownBefore" class="before-trigger">
          <Bubble :y="bubbleY"/>
        </div>
        <div v-else class="after-trigger">
          <div v-if="pullDownNow" class="loading">
            <Loading/>
          </div>
          <div v-else><span>{{ pullDownTxt }}</span></div>
        </div>
      </div>
    </slot>

  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from './loading/loading.vue'
import Bubble from './bubble/bubble.vue'
import { timeout } from './utils'

export default {
  name: 'Scroll',
  components: {
    Loading,
    Bubble,
  },
  props: {
    probeType: {
      // 滚动事件监听类型
      type: Number,
      default: 1,
    },
    click: {
      // 开启点击事件代理
      type: Boolean,
      default: true,
    },
    listenScroll: {
      // 监听滚动
      type: Boolean,
      default: false,
    },
    listenBeforeScrollStart: {
      // 监听滚动开始前
      type: Boolean,
      default: false,
    },
    scrollX: {
      // 开启X轴滚动
      type: Boolean,
      default: false,
    },
    scrollY: {
      // 开启Y轴滚动
      type: Boolean,
      default: true,
    },
    scrollbar: {
      // 开启滚动条
      type: null,
      default: false,
    },
    pullDown: {
      // 启用下拉刷新
      type: Boolean,
      default: true,
    },
    pullDownConfig: {
      // 下拉刷新配置
      type: Object,
      default: () => ({
        threshold: 90, // 触发 pullingDown 的距离
        stop: 40,
        txt: '刷新成功',
      }),
    },
    pullUp: {
      // 启用上拉加载
      type: Boolean,
      default: true,
    },
    pullUpConfig: {
      // 上拉加载配置
      type: Object,
      default: () => ({
        threshold: 100, // 触发 pullingUp 的距离
        txt: { more: '上拉加载', noMore: '-- 到底了 --' },
      }),
    },
    startY: {
      // 起始Y位置
      type: Number,
      default: 0,
    },
    bounce: {
      // 回弹效果
      type: Boolean,
      default: true,
    },
    bounceTime: {
      // 回弹时间
      type: Number,
      default: 800,
    },
  },
  data () {
    return {
      pullDownBefore: true, // 下拉之前
      pullDownNow: false, // 正在下拉
      pullDownStyle: '', // 下拉样式
      pullUpNow: false, // 正在上拉
      pullUpFinally: false, // true表示到了上拉加载到了最底部
      isRebounding: false, // 正在回弹
      bubbleY: 0, // 气泡y坐标
    }
  },
  computed: {
    // 下拉的文本
    pullDownTxt () {
      return this.pullDownConfig && this.pullDownConfig.txt
    },
    // 上拉的文本
    pullUpTxt () {
      const moreTxt = this.pullUpConfig && this.pullUpConfig.txt && this.pullUpConfig.txt.more

      const noMoreTxt = this.pullUpConfig && this.pullUpConfig.txt && this.pullUpConfig.txt.noMore

      return this.pullUpFinally ? noMoreTxt : moreTxt
    },
  },
  created () {
    this.pullDownInitTop = -50
  },
  async mounted () {
    await this.$nextTick()
    this.initScroll()
  },
  methods: {
    // 初始化scroll
    initScroll () {
      if (!this.$refs.scroll) return

      // 设置scrollContent的最小高，实现高度不足时也有回弹效果
      if (this.$refs.scrollContent) {
        this.$refs.scrollContent.style.minHeight = `${this.$refs.scroll.getBoundingClientRect().height + 1}px`
      }

      const options = {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDown && this.pullDownConfig,
        pullUpLoad: this.pullUp && this.pullUpConfig,
        startY: this.startY,
        bounce: this.bounce,
        bounceTime: this.bounceTime,
      }

      this.scroll = new BScroll(this.$refs.scroll, options)

      this.listenScroll && this.scroll.on('scroll', pos => {
        this.$emit('scroll', pos)
      })

      this.listenBeforeScroll && this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScrollStart')
      })

      this.pullDown && this._initPullDown()

      this.pullUp && this._initPullUp()
    },
    // 初始化下拉刷新
    _initPullDown () {
      this.scroll.on('pullingDown', () => {
        this.pullDownBefore = false
        this.pullDownNow = true
        this.$emit('pullingDown')
      })

      this.scroll.on('scroll', pos => {
        if (!this.pullDown) return

        if (this.pullDownBefore) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDown.stop - pos.y)}px`
        }
      })
    },
    // 初始化上拉加载
    _initPullUp () {
      this.scroll.on('pullingUp', async () => {
        if (this.pullUpFinally) return

        this.pullUpNow = true
        this.$emit('pullingUp')
      })
    },
    async _pullDownRebound () {
      await timeout(this.bounceTime)
      this.isRebounding = true
      this.scroll.finishPullDown()
    },
    async _pullDownAfter () {
      await timeout(this.bounceTime)
      this.pullDownStyle = `top:${this.pullDownInitTop}px`
      this.pullDownBefore = true
      this.isRebounding = false
      this.refresh()
    },
    // 关闭滚动
    disable () {
      this.scroll && this.scroll.disable()
    },
    // 开启滚动
    enable () {
      this.scroll && this.scroll.enable()
    },
    // 销毁滚动示例
    destroy () {
      this.scroll.destroy()
    },
    // 刷新滚动高度
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 更新加载状态
    async update (dirty) {
      if (this.pullDown && this.pullDownNow) {
        this.pullUpFinally = false
        this.pullDownNow = false
        await this._pullDownRebound()
        this._pullDownAfter()
      } else if (this.pullUp && this.pullUpNow) {
        this.pullUpNow = false
        this.scroll.finishPullUp()
        this.pullUpFinally = !!dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    /**
     * 滚动到指定位置
     * @param  {Number} x    x轴位置
     * @param  {Number} y    y轴位置
     * @param  {Number} time 滚动时间
     * @return {Void}
     */
    scrollTo (x = 0, y = 0, time = this.bounceTime) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 滚动到元素
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
  },
}
</script>

<style lang="stylus">
.scroll {
  width: 100%
  height: 100%
  overflow: hidden
  box-sizing: border-box
  font-size: 14px
  color: #606c71
  .scroll-wrapper {
    position: relative
    z-index: 1
  }
  .pulldown-wrapper {
    position: absolute
    width: 100%
    top: -50px
    left: 0
    display: flex
    justify-content: center
    align-items: center
    transition: all
    .after-trigger {
      margin-bottom: 10px
    }
  }
  .pullup-wrapper {
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    padding: 16px 0
  }
}
</style>
