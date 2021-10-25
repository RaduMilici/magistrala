import { App } from '../app/App';
//import { Triangle } from '../core/Triangle';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../shaders/vertex_shader_chunks';
import { square } from './assets/square';
import { makeTranslationSlider } from './ui/translation_slider';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
const fragmentShader = app.newFragmentShader({
  source: fragmentShaderSource,
});
const geometry = app.newGeometry({
  triangles: square, //Triangle.randomMultiple(5),
});
const mesh1 = app.newMesh({ vertexShader, fragmentShader, geometry });
const mesh2 = app.newMesh({ vertexShader, fragmentShader, geometry });

const scene = app.newScene();
scene.add(mesh1);
scene.add(mesh2);
app.addScene(scene);
app.startRendering();

makeTranslationSlider('mesh1', mesh1);
makeTranslationSlider('mesh2', mesh2);
