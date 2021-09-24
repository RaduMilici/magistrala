import typescript from '@rollup/plugin-typescript';

export const rollupBaseConfig = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [typescript()],
};
