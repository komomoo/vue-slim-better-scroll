<template>
  <div :class="c('-loading-container')">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
import mixin from '../mixins'

export default {
  name: 'Loading',
  mixins: [mixin],
}
</script>
<style lang="stylus">
$ = vue-slim-better-scroll

.{$}-loading-container
  > img
    width: 20px
    height: 20px
    display: block
</style>
