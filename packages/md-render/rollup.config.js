import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = [
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
    external: ['@ruslan-sedziukh/md-types', 'react'],
    plugins: [
      nodeResolve(),
      typescript(),
      postcss({
        extract: true,
        modules: true,
      }),
    ],
  },
];

export default config;