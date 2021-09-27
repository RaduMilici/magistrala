import { Renderer } from './core/renderer/Renderer';

const renderer = new Renderer({
  container: document.getElementById('canvas-container'),
  size: { width: 500, height: 500 },
});

console.log(renderer);
