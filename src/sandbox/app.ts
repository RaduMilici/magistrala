import { App } from '../app/App';
import { Triangle } from '../core/Triangle';
import vertexShaderSource from '../shaders/vertex_shader.glsl';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

const vertexShader = app.newVertexShader({ source: vertexShaderSource });
const fragmentShader = app.newFragmentShader({
  source: fragmentShaderSource,
});
const geometry = app.newGeometry({
  triangles: Triangle.randomMultiple(5),
});
const mesh = app.newMesh({ vertexShader, fragmentShader, geometry });

const scene = app.newScene();
scene.add(mesh);
app.render(scene);
