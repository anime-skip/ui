import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [
    typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.build.json'), check: false }),
    vue(),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
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
});
