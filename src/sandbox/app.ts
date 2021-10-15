import { App } from '../app/App';
import vertexShaderSource from '../shaders/vertex_shader.glsl';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

const vertexShader = app.createVertexShader({ source: vertexShaderSource });
const fragmentShader = app.createFragmentShader({
  source: fragmentShaderSource,
});
const geometry = new app.Geometry({
  triangles: [
    new app.Triangle(
      new app.Vector2(0, 0),
      new app.Vector2(0, 1),
      new app.Vector2(1, 0)
    ),
    new app.Triangle(
      new app.Vector2(0, 0),
      new app.Vector2(0, -1),
      new app.Vector2(-1, 0)
    ),
  ],
});
const mesh = app.createMesh({ vertexShader, fragmentShader, geometry });

const scene = new app.Scene();
scene.add(mesh);

app.render(scene);
console.log({ vertexShader, fragmentShader });
