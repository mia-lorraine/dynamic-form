import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
    {
      path: '/form',
      name: 'form',
      component: AboutView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionStorage.getItem('token')) next({ name: 'login' })
  else next()
})

export default router
