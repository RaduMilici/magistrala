import { App } from '../app/App';
import { Triangle } from '../core/Triangle';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../shaders/vertex_shader_chunks';
import { GUI } from 'dat.gui';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
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
const gui = new GUI({ name: 'My GUI' });
gui
  .add(params, 'tension', 0, 1)
  .step(0.01)
  .onChange(function (value) {
    //splines.uniform.tension = value;
    //updateSplineOutline();
  });
