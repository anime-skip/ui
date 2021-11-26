import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [
    typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.build.json'), check: false }),
    vue(),
    vueJsx(),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'ui',
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@seregpie/vue-resize-sensor'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
