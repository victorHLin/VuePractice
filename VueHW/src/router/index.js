import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/itemList',
      name: 'items',
      component: () => import('../views/ItemsView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    }
  ]
})

export default router
