# vue-slim-better-scroll
> 极简使用的/更简洁的vue滚动插件，基于[better-scroll](https://github.com/ustbhuangyi/better-scroll)

## 特性
* **极简使用**
  * 零配置
  * 自动刷新滚动高度，无需手动调用refresh
* **更优性能**
  * 使用transform替代position，下拉刷新不再掉帧
* **更好的体验**
  * 滚动内容小于滚动视口时，也可以滚动/回弹/下拉刷新/上拉加载
  * 多次下拉刷新节流
  * 多处细节改进


## 示例
[Demo](https://wannaxiao.github.io/vue-slim-better-scroll/)

[Demo源码](https://github.com/wannaxiao/vue-slim-better-scroll/blob/master/src/App.vue)


## 快速开始
1. 安装 vue-slim-better-scroll
``` js
// 使用yarn：
yarn add vue-slim-better-scroll
// 或使用npm：
npm i -S vue-slim-better-scroll
```


2. 引入 vue-slim-better-scroll
* 插件形式全局引入
``` js
import Scroll from 'vueSlimBetterScroll'
Vue.use(Scroll)
```

* 组件形式引入
``` js
// *.vue 中
import Scroll from 'vueSlimBetterScroll'
export default {
  /* ... */
  components: {
    Scroll,
  }
  /* ... */
```


3. 使用它
``` html
<scroll
  ref="scroll"
  @pullingDown="loadRefresh"
  @pullingUp="loadMore">
    <!-- 滚动的内容 -->
</scroll>
```

## 文档
### Props
参数 | 说明 | 类型 | 默认值
|---|---|---|---|
probeType | 派发scroll事件的条件 | Number | 1 |
listenScroll | 是否监听滚动，开启后才能派发scroll事件| Boolean | false
listenBeforeScroll | 是否监听滚动之前，开启后才能派发beforeScrollStart事件| Boolean | false
scrollX | 开启X轴滚动 | Boolean | false
scrollY | 开启Y轴滚动 | Boolean | true
scrollbar | 开启滚动条 | Boolean or Object | false
pullDown | 启用下拉刷新 | Boolean | true
pullDownConfig | 下拉刷新配置 | Object | { threshold: 90, // 触发 pullingDown 的距离 stop: 40, // pullingDown 正在刷新 hold 时的距离 txt: '刷新成功', }
pullUp | 启用上拉加载 | Boolean | true
pullUpConfig | 上拉加载配置 | Object | { threshold: 100, // 提前触发 pullingUp 的距离 txt: { more: '上拉加载', noMore: '— 我是有底线的 —' }
startY | 纵轴方向初始化位置 | Number | 0
bounce | 回弹效果 | Boolean | true
bounceTime | 回弹时间 | Number | 600
preventDefaultException | [不阻止默认行为](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#preventdefaultexception) | Object | {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}
autoUpdate | 自动刷新高度。如果关闭，需要手动调用update() | Boolean | true

### Methods
方法名 | 说明 | 参数
|---|---|---|
initScroll | 初始化scroll组件 | |
disable | 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应 | |
enable | 启用 better-scroll, 默认 开启 | |
scrollTo | 滚动到指定的位置 | (x:Number, y:Number, time:Number) 1.x横轴坐标(px)，默认值=0  2.y 纵轴坐标(px)，默认值=0  3.滚动动画执行的时长(ms)，默认值=$props.bounceTime=600
scrollToElement | 滚动到指定的目标元素 | (el, time, offsetX , offsetY )接收4个参数 详情请查看: [scrollToElement](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#scrolltoelementel-time-offsetx-offsety-easing)
destroy | 销毁 better-scroll，解绑事件
refresh | 刷新滚动高度（当页面无法滚动时，可尝试调用此方法），vue-slim-better-scroll在 this.$parent.$data 改变时会自动调用该方法，一般无需手动调用该方法
update | 更新加载状态，下拉/下拉成功后使用。一般 vue-slim-better-scroll 会在恰当的时候自动调用该方法。仅当上拉加载到最后一页/需要触发停止上拉加载时，需要手动调用它 | (final:Boolean) 表明pullUp上拉加载是否到了最底部

### Events:
事件名称 | 说明 | 回调参数
|---|---|---|
scroll | 触发时机：滚动过程中，具体时机取决于选项中的 probeType (触发事件在参数中需要开启 **listenScroll** ) | (pos:Object) 滚动的实时坐标
beforeScrollStart | 触发时机：滚动开始之前 (触发事件在参数中需要开启 **listenBeforeScroll** )
pullingDown | 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullDownRefresh** 相关配置 )
pullingUp | 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullingUp** 相关配置 )

