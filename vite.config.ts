import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.build.json'), check: false }),
    vue(),
    vueJsx(),
    copy({
      targets: [{ src: 'src/lib/tailwind.preset.js', dest: 'lib', rename: 'tailwind-preset.js' }],
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'ui',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
