import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
