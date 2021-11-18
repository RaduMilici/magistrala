import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import glsl from 'rollup-plugin-glsl';

export const rollupBaseConfig = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    typescript({
      noEmitOnError: false,
    }),
    glsl({ include: '**/**/*.glsl' }),
  ],
};
