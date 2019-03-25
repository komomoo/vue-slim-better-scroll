# vue-slim-better-scroll

> 开箱即用的/渐进式的 vue 移动端滚动组件/插件，基于[better-scroll](https://github.com/ustbhuangyi/better-scroll)

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

## 🐠 示例&文档

<img src="./docs/assets/demo.gif" width="320" style="margin-top: 20px;">

[Demo](https://wannaxiao.github.io/vue-slim-better-scroll/demo/default/dist/)

[Demo 示例代码](https://github.com/wannaxiao/vue-slim-better-scroll/blob/master/demo/default/App.vue)

[查看文档](https://wannaxiao.github.io/vue-slim-better-scroll/docs/dist/)

## 🚀 快速开始

1.  安装

```bash
yarn add vue-slim-better-scroll # 或 npm i -S vue-slim-better-scroll
```

2.  引入

* 插件形式全局引入

```js
// 入口文件 main.js 中
import Scroll from 'vue-slim-better-scroll'
Vue.use(Scroll)
```

* 组件形式引入

```js
// *.vue 中
import Scroll from 'vue-slim-better-scroll'
export default {
  /* ... */
  components: {
    Scroll,
  },
  /* ... */
}
```

3.  使用它，请参考[Demo 示例代码](https://github.com/wannaxiao/vue-slim-better-scroll/blob/master/demo/default/App.vue)

```html
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

[查看完整文档](https://wannaxiao.github.io/vue-slim-better-scroll/docs/dist/)

<br>
<br>
😉😘 如果它对你有所帮助，可以点一下 <b>⭐️<a href="#">Star</a></b> ~

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, momoko
