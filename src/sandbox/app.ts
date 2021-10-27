import { App } from '../app/App';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../shaders/vertex_shader_chunks';
import { fPoints } from './assets/f_points';
// import { makeTranslationSlider } from './ui/translation_slider';
import { Color } from '../core/color/Color';
import { Updater, GameObject, Component, tickData } from 'pulsar-pathfinding';
import { Mesh } from '../core/mesh/Mesh';
import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/Triangle';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
  depth: 1000,
});

app.renderer.setClearColor(new Color({ r: 0, g: 1, b: 0, a: 1 }));

const scene = app.newScene();

const updater = new Updater();

class Square extends GameObject {
  mesh: Mesh;

  constructor() {
    super({ name: 'square' });
    const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
    const fragmentShader = app.newFragmentShader({
      source: fragmentShaderSource,
    });
    const geometry = app.newGeometry({
      triangles: Triangle.multipleFromCoordinates(fPoints),
    });
    this.mesh = app.newMesh({ vertexShader, fragmentShader, geometry });
    scene.add(this.mesh);
  }
}

class Rotate extends Component {
  parent: Square;

  constructor(parent: Square) {
    super({ name: 'Rotate' });
    this.parent = parent;
  }

  update({ deltaTimeMS, elapsedTime }: tickData) {
    this.parent.mesh.transforms.rotation = new Vector3({
      x: elapsedTime,
      y: elapsedTime,
      z: elapsedTime,
    });
  }
}

class RenderGameObject extends GameObject {
  constructor() {
    super({ name: 'render loop game object' });
  }
}

class RenderLoop extends Component {
  constructor() {
    super({ name: 'render loop component' });
  }
  update() {
    app.renderOnce();
  }
}

const square = new Square();
const rotate = new Rotate(square);
square.addComponent(rotate);

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());

app.addScene(scene);
updater.add(square);
updater.add(renderGameObject);
updater.start();

square.mesh.transforms.translation = new Vector3({ x: 1, y: -1, z: 0 });
