import './lib/scss/all.scss';

import { createApp } from 'vue';
import App from './App.vue';
import plugin from './lib';
import Group from './components/Group.vue';

const app = createApp(App).component('Group', Group).use(plugin);

app.mount('#app');
