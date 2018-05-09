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
import Loading from './Loading'
import Bubble from './Bubble'
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
        stop: 40, // pullingDown 正在刷新 hold 时的距离
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
        threshold: 100, // 提前触发 pullingUp 的距离
        txt: { more: '上拉加载', noMore: '— 我是有底线的 —' },
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
      default: 600,
    },
    preventDefaultException: {
      // 不阻止默认行为
      type: Object,
      default: () => ({
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
      }),
    },
    autoUpdate: {
      // 自动刷新高度
      type: Boolean,
      default: true,
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

    // 深监视 $data，发生改变时更新高度
    this.autoUpdate && this.$parent && this.$parent.$data && this.$watch(() => this.$parent.$data, (val) => {
      this.update()
    }, {
      deep: true,
    })
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
        preventDefaultException: this.preventDefaultException,
      }

      this.scroll = new BScroll(this.$refs.scroll, options)

      this.listenScroll &&
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })

      this.listenBeforeScroll &&
        this.scroll.on('beforeScrollStart', () => {
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
        this.scroll.closePullDown() // 防止在 bounce 前二次触发
      })

      this.scroll.on('scroll', pos => {
        if (!this.pullDown || pos.y < 0) return

        const posY = Math.floor(pos.y) // 滚动的y轴位置：Number

        if (this.pullDownBefore) {
          this.bubbleY = Math.max(0, posY + this.pullDownInitTop)
          this.pullDownStyle = `transform: translateY(${Math.min(posY, -this.pullDownInitTop)}px)`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `transform: translateY(${Math.min(posY, this.pullDownConfig.stop)}px)`
        }
      })
    },
    // 初始化上拉加载
    _initPullUp () {
      this.scroll.on('pullingUp', () => {
        if (this.pullUpFinally) {
          this.scroll.closePullUp()
        } else {
          this.pullUpNow = true
          this.$emit('pullingUp')
        }
      })
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
      this.scroll && this.scroll.destroy()
    },
    // 刷新滚动高度
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 更新加载状态，下拉/下拉成功后使用
    async update (final) {
      if (this.pullDown && this.pullDownNow) {
        // 下拉刷新触发成功后
        this.pullDownNow = false
        await timeout(this.bounceTime / 2) // 刷新成功hold
        this.isRebounding = true
        this.scroll.finishPullDown() // 开始回弹
        await timeout(this.bounceTime)
        this.pullDownBefore = true
        this.isRebounding = false
        this.scroll.openPullDown(this.pullDownConfig)

        this.pullUpFinally = false
        this.pullUp && this.scroll.openPullUp(this.pullUpConfig)
      } else if (this.pullUp && this.pullUpNow) {
        // 上拉加载触发成功后
        this.pullUpNow = false
        this.scroll.finishPullUp()

        this.pullUpFinally = !!final
      }
      await this.$nextTick()
      this.refresh()
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
  width 100%
  height 100%
  overflow hidden
  box-sizing border-box
  position relative
  .scroll-wrapper {
    position relative
    z-index 1
    .pullup-wrapper {
      width 100%
      height 50px
      display flex
      justify-content center
      align-items center
      font-size 14px
      color rgb(153, 153, 153)
    }
  }
  .pulldown-wrapper {
    position absolute
    left 0
    top -50px
    width 100%
    display flex
    justify-content center
    align-items center
    transition all
    font-size 14px
    color rgb(153, 153, 153)
    .before-trigger {
      display flex
    }
    .after-trigger {
      width 100%
      height 40px
      display flex
      justify-content center
      align-items center
    }
  }
}
</style>
