import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import execute from 'rollup-plugin-execute';

import packageJson from './package.json';

export default {
  input: 'src/lib/index.ts',
  output: [
    {
      format: 'cjs',
      file: packageJson.main,
      sourcemap: true,
      exports: 'named',
    },
    {
      format: 'esm',
      file: packageJson.module,
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    del({ targets: 'lib/*' }),
    scss(),
    typescript({ tsconfig: 'tsconfig.build.json' }),
    vue(),
    resolve(),
    commonjs(),
    execute([
      // Generate latest tailwind scss
      'yarn build:tailwind-scss',
      // Duplicate main declaration file so webpack is happy
      'cp lib/index.d.ts lib/index.esm.d.ts',
    ]),
    copy({
      targets: [{ src: 'src/lib/scss', dest: 'lib' }],
      targets: [{ src: 'src/lib/tailwind.preset.js', dest: 'lib', rename: 'tailwind-preset.js' }],
    }),
  ],
};
