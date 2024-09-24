import { Vector3 } from '../core/Vector3';
import { app, scene, updater } from './app';
import { CameraGameObject } from './assets/game_assets/CameraSlide.gameobject';
import {
    RenderGameObject,
    RenderLoop,
} from './assets/game_assets/Render.gameobject';
import { TestObject } from './assets/game_assets/TestObject';

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());

new TestObject().loadMesh().then((mesh) => {
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
