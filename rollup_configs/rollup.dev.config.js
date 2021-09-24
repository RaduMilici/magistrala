import merge from 'deepmerge';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [html({}), serve('dist')],
});
