import merge from 'deepmerge';
import clean from 'rollup-plugin-clean';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [
    clean(),
    terser(),
    htmlTemplate({
      template: 'rollup_configs/index_template.html',
      target: 'index.html',
    }),
    serve('dist'),
  ],
});
