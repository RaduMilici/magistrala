import merge from 'deepmerge';
import clean from 'rollup-plugin-clean';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { visualizer } from 'rollup-plugin-visualizer';

import { rollupBaseConfig } from './rollup.base.config';

export default merge(rollupBaseConfig, {
  plugins: [
    clean(),
    htmlTemplate({
      template: 'rollup_configs/index_template.html',
      target: 'index.html',
    }),
    serve({
      open: true,
      contentBase: 'dist',
      port: 3000,
    }),
    livereload({
      watch: 'dist',
    }),
    visualizer(),
  ],
});
