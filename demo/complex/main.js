import Vue from 'vue'
import router from './router'
import App from './App'

import Loading from 'vue-slim-loading'
Vue.use(Loading)

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
