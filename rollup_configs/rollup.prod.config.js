import { terser } from 'rollup-plugin-terser';
import merge from 'deepmerge';
import replace from '@rollup/plugin-replace';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    terser(),
  ],
});
