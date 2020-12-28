import './lib-scss/all.scss';

import { createApp } from 'vue';
import App from './App.vue';
import useComponents from './lib-components';
import Group from './components/Group.vue';

const app = createApp(App);

app.component('Group', Group);
useComponents(app);

app.mount('#app');
