import merge from 'deepmerge';
import serve from 'rollup-plugin-serve';
import clean from 'rollup-plugin-clean';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [
    clean(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    alias({
      entries: [{ find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' }],
    }),
    nodeResolve(),
    htmlTemplate({
      template: 'rollup_configs/index_template.html',
      target: 'index.html',
    }),
    serve('dist'),
  ],
});
