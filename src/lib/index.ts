import { Plugin } from 'vue';

// Import vue components
import * as components from './components';

// Create module definition for Vue.use()
const plugin: Plugin = {
  install(app) {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  },
};

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';

// Expose theme variables
export { default as theme } from './scss/generated-config';

// Add utils
export * from './utils/useTimeout';
