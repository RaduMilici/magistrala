import merge from 'deepmerge';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import clean from 'rollup-plugin-clean';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [clean(), html({}), serve('dist')],
});
