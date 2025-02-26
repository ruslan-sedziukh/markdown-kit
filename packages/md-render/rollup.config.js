import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

const config = [
  {
    input: 'index.ts', // Input is now your TypeScript source
    output: {
      file: 'dist/md-render.js',
      format: 'es',
      sourcemap: true,
    },
    external: ['@ruslan-sedziukh/md-types', 'react'], //Adjust this if needed.
    plugins: [
      nodeResolve(),
      typescript(), // Rollup handles TypeScript compilation
      postcss({
        extract: true,
        modules: true, // Enable CSS modules
        minimize: true,
        plugins: [],
      }),
      copy({
        targets: [{ src: 'src/index.css', dest: 'dist' }],
      }),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: {
      file: 'dist/md-render.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;