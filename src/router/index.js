import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import examMain1 from '@/pages/examMain1'
import lawFreePoints from '@/pages/lawFreePoints'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/examMain1',
      name: 'examMain1',
      component: examMain1
    },
    {
      path: '/lawFreePoints',
      name: 'lawFreePoints',
      component: lawFreePoints
    }
  ]
})
