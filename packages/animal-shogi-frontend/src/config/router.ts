import { createRouter, createWebHistory } from 'vue-router'
import Loby from '../pages/Loby.vue'
import Room from '../pages/Room.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loby,
    },
    {
      path: '/room/:style/:roomId/:playerId',
      name: 'room',
      component: Room,
    },
  ],
})

export default router
