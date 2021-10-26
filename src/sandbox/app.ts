import { App } from '../app/App';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../shaders/vertex_shader_chunks';
import { squarePoints } from './assets/squarePoints';
import { makeTranslationSlider } from './ui/translation_slider';
import { Color } from '../core/color/Color';
import { Updater, GameObject, Component, tickData } from 'pulsar-pathfinding';
import { Mesh } from '../core/mesh/Mesh';

const app = new App({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

app.renderer.setClearColor(new Color({ r: 0, g: 1, b: 0, a: 1 }));

const scene = app.newScene();
app.addScene(scene);

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
      triangles: squarePoints,
    });
    this.mesh = app.newMesh({ vertexShader, fragmentShader, geometry });
    //this.mesh.transforms.rotation = DegToRad(45);
    scene.add(this.mesh);
  }
}

class Rotate extends Component {
  parent: Square;
  rotationSpeed: number = 0.002;
  movementSpeed: number = 2;

  constructor(parent: Square) {
    super({ name: 'Rotate' });
    this.parent = parent;
  }

  update({ deltaTimeMS, elapsedTime }: tickData) {
    // this.parent.mesh.transforms.rotation += deltaTimeMS * this.rotationSpeed;
    // this.parent.mesh.transforms.translation.y = Math.sin(
    //   elapsedTime * this.movementSpeed
    // );
    // this.parent.mesh.transforms.scale.y = Math.sin(
    //   elapsedTime * this.movementSpeed
    // );
  }
}

class RenderGameObject extends GameObject {
  constructor() {
    super({ name: 'render loop object' });
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
const renderLoopGameObject = new RenderGameObject();

square.addComponent(rotate);
renderLoopGameObject.addComponent(new RenderLoop());

updater.add(square);
updater.add(renderLoopGameObject);
updater.start();

//square.mesh.transforms.translation = new Vector({ x: 1, y: 1 });
// square.mesh.transforms.translation.x = 0;
// square.mesh.transforms.scale.x = 2;
// square.mesh.transforms.scale = new Vector({ x: 1, y: 2 });
//square.mesh.transforms.translation = new Vector({ x: 1, y: -1 });
makeTranslationSlider('mesh1', square.mesh);
