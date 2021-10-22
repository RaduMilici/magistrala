import { App } from '../app/App';
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
const geometry = new app.Geometry({
  triangles: app.Triangle.randomMultiple(5),
});
const mesh = app.newMesh({ vertexShader, fragmentShader, geometry });

const scene = new app.Scene();
scene.add(mesh);
app.render(scene);
