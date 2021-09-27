const madge = require('madge');

madge('src/index.ts', {
  tsConfig: 'tsconfig.json',
}).then((res) => {
  console.log('Warnings:', res.warnings());
  console.log('Circular:', res.circular());
  console.log('Orphans:', res.orphans());
  res.image('scripts/circular_dependencies/graph.svg');
});
