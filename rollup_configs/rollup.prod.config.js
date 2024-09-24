import merge from 'deepmerge';
import { terser } from 'rollup-plugin-terser';

import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
    plugins: [terser()],
});
