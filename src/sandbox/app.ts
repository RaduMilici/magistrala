import { App } from '../app/App';
import { Triangle } from '../core/Triangle';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../shaders/vertex_shader_chunks';
import { createApp, defineComponent } from 'vue';

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

const Component = defineComponent({
  methods: {
    onChange(e: Event) {
      const { value } = <HTMLInputElement>e.target;
      console.log(value);
    },
  },
  template:
    '<input @change="onChange" type="range" min="0" max="100" value="0">',
});

createApp(Component).mount('#magistrala-app-ui');
