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
      path: '/room/single',
      name: 'singleRoom',
      component: Room,
      props: { playStyle: 'single' },
    },
    {
      path: '/room/multi/:roomId/:playerId',
      name: 'multiRoom',
      component: Room,
      props: (route) => ({ playStyle: 'multi', ...route.params }),
    },
  ],
})

export default router
