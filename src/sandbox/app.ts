import {
  Component,
  DegToRad,
  GameObject,
  Updater,
  size,
  tickData,
} from 'pulsar-pathfinding';
import { App } from '../app/App';
import { Vector3 } from '../core/Vector3';
import { Color } from '../core/color/Color';
import { Component3D } from '../core/ecs/Component3D';
import { GameObject3D } from '../core/ecs/GameObject3D';
import { Triangle } from '../core/triangle/Triangle';
import { fPoints } from './assets/f/f_points';
import fragmentShaderSource from './shaders/fragment_shader.glsl';
import { vertexShaderChunks } from './shaders/vertex_shader_chunks';

const rendererSize: size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const app = new App({
  container: document.getElementById('magistrala-app'),
  size: rendererSize,
  fov: DegToRad(60),
  aspect: rendererSize.width / rendererSize.height,
  near: 1,
  far: 1000,
});
app.renderer.setClearColor(Color.from255({ r: 40, g: 44, b: 52 }));
const scene = app.newScene();
const updater = new Updater();

class FShape extends GameObject3D {
  constructor() {
    super({ name: 'f shape' });
    const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
    const fragmentShader = app.newFragmentShader({
      source: fragmentShaderSource,
    });

    const triangles = Triangle.multipleFromCoordinates(fPoints);
    for (let i = 0; i < triangles.length; i++) {
      triangles[i].color = Color.random();
    }
    const geometry = app.newGeometry({ triangles });
    this.mesh = app.newMesh({ vertexShader, fragmentShader, geometry });
  }
}

class Rotate extends Component3D {
  constructor() {
    super({ name: 'Rotate' });
  }

  update({ elapsedTime }: tickData) {
    this.parent.mesh.transforms.rotation = new Vector3({
      x: DegToRad(180),
      y: elapsedTime,
      z: 0,
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

for (let i = 0; i < 10; i++) {
  const fShape = new FShape();
  fShape.addComponent(new Rotate());
  scene.add(fShape.mesh);
  updater.add(fShape);
  fShape.mesh.transforms.translation = new Vector3({
    x: 0,
    y: 0,
    z: -500,
  });
}

app.addScene(scene);

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());
updater.add(renderGameObject);
updater.start();
