import typescript from '@rollup/plugin-typescript';
import glsl from 'rollup-plugin-glsl';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export const rollupBaseConfig = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [nodeResolve(), typescript(), glsl({ include: '**/**/*.glsl' })],
};
