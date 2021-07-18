import './lib/styles/index.scss';
import { createApp } from 'vue';
import plugin from './lib';
import Group from './components/Group.vue';
import { createRouter, createWebHistory, RouterView } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/:pathMatch(.*)*',
      component: () => import('./App.vue'),
    },
  ],
});

createApp(RouterView).component('Group', Group).use(plugin).use(router).mount('#app');
