import { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
  rollupInputOptions: {
    input: path.resolve(__dirname, 'src/main.ts'),
  },
  rollupOutputOptions: {
    // file: 'index.js',
    // format: 'cjs',
    dir: './dist',
    // entryFileNames: 'equal.[extname]'
  },
  emitIndex: false,
  assetsDir: '/',
  sourcemap: true,
  // cssPreprocessOptions: {
  //   scss: {
  //     additionalData: '$primary: red;',
  //   },
  // },
};

export default config;
