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
import { ObjLoader } from '../loader/ObjLoader';
import fragmentShaderSource from './shaders/fragment_shader.glsl';
import { vertexShaderChunks } from './shaders/vertex_shader_chunks';

enum MeshUrls {
  CUBE = 'https://gist.githubusercontent.com/MaikKlein/0b6d6bb58772c13593d0a0add6004c1c/raw/48cf9c6d1cdd43cc6862d7d34a68114e2b93d497/cube.obj',
  TEAPOT = 'https://gist.githubusercontent.com/RaduMilici/ea6f99035120ea0e2dec3d73f72e9061/raw/89295c4f1a948cfba5f99fe0abd95ba61ec21271/teapot.obj',
  TEDDY = 'https://gist.githubusercontent.com/RaduMilici/07c8571799e68da7aa5d051bbcca6e32/raw/7d1005611653859231725a5b420d57702cece954/teddy.obj',
}

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
    this.loadMesh();
  }

  async loadMesh() {
    const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
    const fragmentShader = app.newFragmentShader({
      source: fragmentShaderSource,
    });
    const { triangles } = await new ObjLoader().load(MeshUrls.TEDDY);
    triangles.forEach((triangle) => (triangle.color = Color.random()));
    this.mesh = app.newMesh({
      fragmentShader,
      vertexShader,
      geometry: app.newGeometry({ triangles }),
    });
    this.mesh.transforms.translation = new Vector3({
      x: 0,
      y: 0,
      z: -500,
    });
    this.mesh.transforms.scale = new Vector3({ x: 10, y: 10, z: 10 });
    scene.add(this.mesh);
    updater.add(this);
  }
}

class Rotate extends Component3D {
  constructor() {
    super({ name: 'Rotate' });
  }

  update({ elapsedTime }: tickData) {
    this.parent.mesh.transforms.rotation = new Vector3({
      x: 0,
      y: -elapsedTime,
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

for (let i = 0; i < 1; i++) {
  const fShape = new FShape();
  fShape.addComponent(new Rotate());
}

app.addScene(scene);

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());
updater.add(renderGameObject);
updater.start();
