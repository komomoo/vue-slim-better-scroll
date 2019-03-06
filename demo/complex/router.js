import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Detail from './views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  {
    path: '*',
    redirect: '/home',
  },
]

export default new VueRouter({
  routes,
})
