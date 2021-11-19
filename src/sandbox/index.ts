import { Vector3 } from '../core/Vector3';
import { app, scene, updater } from './app';
import { CameraGameObject } from './assets/game_assets/CameraSlide.gameobject';
import {
  RenderGameObject,
  RenderLoop,
} from './assets/game_assets/Render.gameobject';
import { TestObject } from './assets/game_assets/TestObject';
import { ImgUrl } from './assets/obj_url';

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());

const addCircle = () => {
  const count = 5;
  const radius = 15;
  for (let i = 0; i < count; i++) {
    const angle = (i * Math.PI * 2) / count;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    new TestObject()
      .TEST_loadMeshWithTexture(app.newTexture({ src: ImgUrl.BLOODBRAND }))
      .then((mesh) => {
        mesh.transforms.translation = new Vector3({ x, z });
        scene.add(mesh);
      });
  }
};

new TestObject()
  .TEST_loadMeshWithTexture(app.newTexture({ src: ImgUrl.BLOODBRAND }))
  .then((mesh) => {
    mesh.transforms.translation = new Vector3({ x: 1 });
    scene.add(mesh);
  });

new TestObject()
  .TEST_loadMeshWithTexture(app.newTexture({ src: ImgUrl.BLOODBRAND }))
  .then((mesh) => {
    mesh.transforms.translation = new Vector3({ x: -1 });
    scene.add(mesh);
  });

// TODO: support multiple lights
const directionalLight = app.newDirectionalLight(
  new Vector3({ x: 0.5, y: 0.5, z: 0.5 }),
);
scene.add(directionalLight);
const camera = new CameraGameObject();
updater.add(camera);
updater.add(renderGameObject);
updater.start();
