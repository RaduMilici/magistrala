import { terser } from 'rollup-plugin-terser';
import merge from 'deepmerge';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [terser()],
});
