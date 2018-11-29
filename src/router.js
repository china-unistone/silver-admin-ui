import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '细银生活后台管理'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        title: '细银生活后台管理'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    console.log('从' + from.name + '错误的跳转到未知的', to.name)
    next('/')
  } else {
    next()
  }
})

export default router