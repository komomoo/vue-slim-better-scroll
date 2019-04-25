<template>
  <div class="app">
    <keep-alive>
      <router-view class="router-view" />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="stylus">
$headerHeight = 44px;
$baseColor = #6A9FB5;
$bgColor = #FAFAFA;
* {
  padding: 0;
  margin: 0;
}
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app, .router-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    background: $baseColor;
    position: relative;
    font-weight: 500;
  }

  .footer {
    flex: 0 0 $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    background: $baseColor;
  }

  .content {
    flex: 1;
    background-color: $bgColor;
    overflow: hidden;
    box-sizing: border-box;

    ul {
      li {
        background: #fff;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: $baseColor;
        border-bottom: 1px solid #eee;
        position: relative;
      }
    }
  }
}
.allow-left-icon {
  border: solid 2px #fff;
  border-bottom-width: 0;
  border-left-width: 0;
  position: absolute;
  top: 50%;
  left: 20px;
  width: 8px;
  height: 8px;
  transform: translateY(-50%) rotate(-135deg);
}
.allow-right-icon {
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  position: absolute;
  top: 50%;
  right: 20px;
  width: 8px;
  height: 8px;
  transform: translateY(-50%) rotate(45deg);
}
</style>
