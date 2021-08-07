import { App, Plugin } from 'vue';
import * as components from './components';

// Default export for Vue.use()
const plugin: Plugin = {
  install(app: App) {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  },
};
export default plugin;

// Named exports
export * from './components';
export { default as theme } from './styles/generated-config';
export * from './utils/useTimeout';
export * from './components/NavBarItems/types';
export * as Utils from './Utils';
