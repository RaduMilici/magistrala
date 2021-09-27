import merge from 'deepmerge';
import serve from 'rollup-plugin-serve';
import clean from 'rollup-plugin-clean';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [
    clean(),
    htmlTemplate({
      template: 'rollup_configs/index_template.html',
      target: 'index.html',
    }),
    serve('dist'),
  ],
});
