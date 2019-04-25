---
sidebar: auto
---

# vue-slim-better-scroll

> 开箱即用的/渐进式的 vue移动端滚动组件/插件，基于[better-scroll](https://github.com/ustbhuangyi/better-scroll)

## ✨ 特性

* **极简使用**
  * 零配置/渐进式配置
  * 自动刷新滚动高度
* **更优性能**
  * 使用 transform 替代 position ，下拉刷新不再掉帧
* **更好体验**
  * 滚动内容小于滚动视口时，也可以滚动/回弹/下拉刷新/上拉加载
  * 多次下拉刷新节流
  * 多处细节改进
* **更小体积**
  * v1.5.0+ 使用 [dio](https://github.com/wannaxiao/dio) 构建，仅 25k (旧版本为 webpack 构建，体积 47k)
  * v1.6.0+ 抛弃 gif，使用 css 重构 Loading。体积近一步减小，仅 21k


## 🐠 示例

<img src="./assets/demo.gif" width="320" style="margin-top: 20px;">

[Demo](https://wannaxiao.github.io/vue-slim-better-scroll/demo/default/dist/)

[Demo示例代码](https://github.com/wannaxiao/vue-slim-better-scroll/blob/master/demo/default/App.vue)


## 🚀 快速开始

1.  安装

```bash
yarn add vue-slim-better-scroll # 或 npm i -S vue-slim-better-scroll
```


2. 引入

* 插件形式全局引入
``` js
// 入口文件 main.js 中
import Scroll from 'vue-slim-better-scroll'
Vue.use(Scroll)
```

* 组件形式引入
``` js
// *.vue 中
import Scroll from 'vue-slim-better-scroll'
export default {
  /* ... */
  components: {
    Scroll,
  }
  /* ... */
}
```


3. 使用它，请参考[Demo示例代码](https://github.com/wannaxiao/vue-slim-better-scroll/blob/master/demo/default/App.vue)
``` html
<!-- 简单场景 -->
<Scroll
  ref="scroll"
  :autoUpdate="true"
  @pullingDown="loadRefresh"
  @pullingUp="loadMore">
    <!-- 滚动的内容 -->
</Scroll>

<!-- 复杂场景 -->
<Scroll
  ref="scroll"
  :updateData="[data]"
  :refreshData="[]"
  @pullingDown="loadRefresh"
  @pullingUp="loadMore">
    <!-- 滚动的内容 -->
</Scroll>
```


## 🔌 API文档
### Props
参数 | 说明 | 类型 | 默认值
|---|---|---|---|
probeType | 派发scroll事件的条件 | Number | 1 |
listenScroll | 是否监听滚动，开启后才能派发scroll事件| Boolean | false
listenBeforeScrollStart | 是否监听滚动之前，开启后才能派发beforeScrollStart事件| Boolean | false
scrollX | 开启X轴滚动 | Boolean | false
scrollY | 开启Y轴滚动 | Boolean | true
scrollbar | 开启滚动条 | Boolean or Object | false
pullDown | 启用下拉刷新 | Boolean | true
pullDownConfig | 下拉刷新配置 | Object | { <br/> threshold: 90, // 触发 pullingDown 的距离    <br/> stop: 40, // pullingDown 正在刷新 hold 时的距离 <br/> txt: '刷新成功', <br/> }
pullUp | 启用上拉加载 | Boolean | true
pullUpConfig | 上拉加载配置 | Object | { <br/> threshold: 100, // 提前触发 pullingUp 的距离 <br/> txt: { more: '上拉加载', noMore: '— 我是有底线的 —' <br/> }
startY | 纵轴方向初始化位置 | Number | 0
bounce | 回弹效果 | Boolean | true
bounceTime | 回弹时间 | Number | 600
preventDefaultException | [不阻止默认行为](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#preventdefaultexception) | Object | { <br/> tagName: /^(INPUT\|TEXTAREA\|BUTTON\|SELECT)$/ <br/> }
autoUpdate | 自动更新高度。原理为深监视 this.$parent.$data 自动调用 update()，适用于简单场景。复杂场景请使用updateData/refreshData 或手动调用update()/refresh() | Boolean | false
updateData | 引起更新上拉/下拉加载状态的数据（下拉刷新/上拉加载相关的数据）。设置此项时，autoUpdate 应设置为 false | Array | null
refreshData | 引起刷新高度的数据（不包含 updateData 内的数据） | Array | null

### Methods
方法名 | 说明 | 参数
|---|---|---|
initScroll | 初始化scroll组件 | |
disable | 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应 | |
enable | 启用 better-scroll, 默认 开启 | |
scrollTo | 滚动到指定的位置 | (x:Number, y:Number, time:Number) <br/> 1.x横轴坐标(px)，默认值0 <br/> 2.y 纵轴坐标(px)，默认值0 <br/> 3.滚动动画执行的时长(ms)，默认值=$props.bounceTime=600
scrollToElement | 滚动到指定的目标元素 | (el, time, offsetX , offsetY )接收4个参数 详情请查看: [scrollToElement](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#scrolltoelementel-time-offsetx-offsety-easing)
scrollToTop | v1.4.0+，滚动到顶部
scrollToBottom | v1.4.0+，滚动到底部
autoPullDownRefresh | v1.5.0+，手动触发下拉刷新
destroy | 销毁 better-scroll，解绑事件
refresh | 刷新滚动高度（当页面无法滚动时，可尝试调用此方法）
update | 更新加载状态，下拉/下拉成功后使用。当 autoUpdate 为 true 时 vue-slim-better-scroll 会在恰当的时候自动调用该方法。当上拉加载到最后一页/需要触发停止上拉加载时，需要手动调用它 | (final:Boolean) 表明pullUp上拉加载是否到了最底部。下拉刷新成功后该值会自动 false。也可传入 false 手动声明不是最后一页

### Events
事件名 | 说明 | 回调参数
|---|---|---|
scroll | 触发时机：滚动过程中，具体时机取决于选项中的 probeType (触发事件在参数中需要开启 **listenScroll**，该参数默认为 false ) | (pos:Object) 滚动的实时坐标
beforeScrollStart | 触发时机：滚动开始之前 (触发事件在参数中需要开启 **listenBeforeScrollStart**，该参数默认为 false )
pullingDown | 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端刷新数据。(触发事件在参数中需要开启 **pullDown**，该参数默认为 true )
pullingUp | 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullUp**，该参数默认为 true )

### Slots
名称 | 说明
|---|---|
default | 滚动的主体内容区域
pulldown | 下拉刷新的内容
pullup |  上拉加载的内容

<br/>
<br/>
😉😘 如果它对你有所帮助，可以点一下 <b>⭐️<a href="https://github.com/wannaxiao/vue-slim-better-scroll">Star</a></b> ~

**🌟 [Star me !](https://github.com/wannaxiao/vue-slim-better-scroll)**
