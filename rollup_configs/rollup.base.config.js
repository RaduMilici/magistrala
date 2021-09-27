import typescript from '@rollup/plugin-typescript';
import glsl from 'rollup-plugin-glsl';

export const rollupBaseConfig = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [typescript(), glsl({ include: '**/**/*.glsl' })],
};
