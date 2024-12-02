import { createRouter, createWebHistory } from 'vue-router'
import StartView from "@/views/StartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/PreGround',
      name: 'PreGround',
      component: () => import('../views/PreGroupView.vue'),
    },
    {
      path: '/FirstRound/FirstRoundView',
      name: 'FirstRound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FirstRound/FirstRoundView.vue'),
    },
    {
      path: '/FirstRound/FirstRoundWinnerListView',
      name: 'FirstRoundWinnerList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FirstRound/FirstRoundWinnerListView.vue'),
    },
    {
      path: '/SecondRound/SecondRoundView',
      name: 'SecondRound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SecondRound/SecondRoundView.vue'),
    },
    {
      path: '/SecondRound/SecondRoundWinnerListView',
      name: 'SecondRoundWinnerList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SecondRound/SecondRoundWinnerListView.vue'),
    },
    {
      path: '/ThirdRound/ThirdRoundView',
      name: 'ThirdRound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ThirdRound/ThirdRoundView.vue'),
    },
    {
      path: '/ThirdRound/ThirdRoundView',
      name: 'ThirdRoundWinnerList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ThirdRound/ThirdRoundWinnerListView.vue'),
    },
    {
      path: '/Finals/Finals',
      name: 'Finals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Finals/Finals.vue'),
    },
    {
      path: '/Finals/Finals',
      name: 'FinalsWinnerList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Finals/FinalsWinnerListView.vue'),
    },
  ],
})

export default router
