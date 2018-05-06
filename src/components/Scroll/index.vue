/**
 * better-scroll vue封装
 * @Author momoko
 * @Date 2017/10/13
 */

<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div class="scroll-content-wrapper">
      <div ref="box" class="scroll-content-box">
        <slot/>
      </div>
      <slot
        :pullUpLoad="pullUpLoad"
        :isPullUpLoad="isPullUpLoad"
        name="pullup"
      >
        <div v-if="pullUpLoad" class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div v-else class="after-trigger">
            <loading/>
          </div>
        </div>
      </slot>
    </div>

    <slot
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY"
      name="pulldown"
    >
      <div v-if="pullDownRefresh" ref="pulldown" :style="pullDownStyle" class="pulldown-wrapper">
        <div v-if="beforePullDown" class="before-trigger">
          <bubble :y="bubbleY"/>
        </div>
        <div v-else class="after-trigger">
          <div v-if="isPullingDown" class="loading">
            <loading/>
          </div>
          <div v-else><span>{{ refreshTxt }}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from './loading/loading.vue'
import Bubble from './bubble/bubble.vue'

const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  components: {
    Loading,
    Bubble,
  },
  props: {
    data: {
      // 影响scroll长度的数据的数组
      type: Array,
      default: () => [],
    },
    probeType: {
      // 滚动事件监听类型
      type: Number,
      default: 1,
    },
    click: {
      // 是否开启点击事件代理
      type: Boolean,
      default: true,
    },
    listenScroll: {
      // 是否监听滚动
      type: Boolean,
      default: false,
    },
    listenBeforeScroll: {
      // 是否监听滚动前
      type: Boolean,
      default: false,
    },
    direction: {
      // 滚动方向
      type: String,
      default: DIRECTION_V,
    },
    scrollbar: {
      // 是否开启滚动条
      type: null,
      default: false,
    },
    pullDownRefresh: {
      // 是否启用下拉刷新
      type: Boolean,
      default: true,
    },
    pullDownRefreshConfig: {
      // 下拉刷新配置
      type: Object,
      default: () => ({
        threshold: 90,
        stop: 40,
        txt: '刷新成功',
      }),
    },
    pullUpLoad: {
      // 是否启用上拉加载
      type: Boolean,
      default: true,
    },
    pullUpLoadConfig: {
      // 上拉加载配置
      type: Object,
      default: () => ({
        threshold: 100,
        txt: { more: '上拉加载更多', noMore: '没有更多数据了' },
      }),
    },
    startY: {
      // 起始Y位置
      type: Number,
      default: 0,
    },
    refreshDelay: {
      // 刷新延迟
      type: Number,
      default: 20,
    },
    freeScroll: {
      // 是否自由滚动
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false, // 正在刷新状态
      isPullUpLoad: false,
      pullUpDirty: true, // false表示到了最后一页
      pullDownStyle: '',
      bubbleY: 0,
    }
  },
  computed: {
    pullUpTxt () {
      const moreTxt =
        (this.pullUpLoadConfig && this.pullUpLoadConfig.txt && this.pullUpLoadConfig.txt.more) || '上拉加载更多'

      const noMoreTxt =
        (this.pullUpLoadConfig && this.pullUpLoadConfig.txt && this.pullUpLoadConfig.txt.noMore) || '没有更多数据了'

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt () {
      return (this.pullDownRefreshConfig && this.pullDownRefreshConfig.txt) || '刷新成功'
    },
  },
  watch: {
    data () {
      setTimeout(() => {
        this.forceUpdate()
      }, this.refreshDelay)
    },
  },
  created () {
    this.pullDownInitTop = -50
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return
      }

      // 计算最小高
      if (this.$refs.box) {
        this.$refs.box.style.minHeight = `${this.$refs.wrapper.getBoundingClientRect().height + 1}px`
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        bounceTime: 600,
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem (e, item) {
      console.log(e)
      this.$emit('click', item)
    },
    destroy () {
      this.scroll.destroy()
    },
    forceUpdate (dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.pullUpDirty = true
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        if (typeof dirty !== 'undefined') {
          this.pullUpDirty = dirty
        }
        this.refresh()
      } else {
        this.refresh()
      }
      // console.log(this.pullUpDirty)
    },
    _initPullDownRefresh () {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })

      this.scroll.on('scroll', pos => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        if (this.pullUpDirty) {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        } else {
          setTimeout(() => {
            this.isPullUpLoad = false
            this.scroll.finishPullUp()
          }, this.refreshDelay)
        }
      })
    },
    _reboundPullDown () {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    },
  },
}
</script>

<style lang="stylus">
.scroll-wrapper {
  width 100%
  height 100%
  overflow hidden
  box-sizing border-box
  position relative
  .scroll-content-wrapper {
    position relative
    z-index 10
    // min-height: calc(100% + 1px)
  }
  .pulldown-wrapper {
    position absolute
    width 100%
    top -50px
    left 0
    display flex
    justify-content center
    align-items center
    transition all
    color #606c71
    font-size 15px
    .after-trigger {
      margin-bottom 10px
    }
  }
  .pullup-wrapper {
    width 100%
    display flex
    justify-content center
    align-items center
    padding 16px 0
    color #606c71
    font-size 15px
  }
}
</style>
