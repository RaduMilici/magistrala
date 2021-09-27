import { Renderer } from './core/renderer/Renderer';

const renderer = new Renderer({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 600 },
});

console.log(renderer);
