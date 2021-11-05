//import { Vector3 } from '../core/Vector3';
//import { Mesh } from '../core/mesh/Mesh';
import { scene, updater } from './app';
import { CameraGameObject } from './assets/game_assets/CameraSlide.gameobject';
import {
  RenderGameObject,
  RenderLoop,
} from './assets/game_assets/Render.gameobject';
import { TestObject } from './assets/game_assets/TestObject';

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());

// const loadPromises: Array<Promise<Mesh>> = [];
// for (let i = 0; i < 30; i++) {
//   loadPromises.push(new Teddy().loadMesh());
// }
//
// Promise.all(loadPromises).then((meshes) =>
//   meshes.forEach((mesh, index) => {
//     const radius = 300;
//     const zOffset = 500;
//     const angle = (index * Math.PI * 2) / meshes.length;
//     const x = Math.cos(angle) * radius;
//     const z = Math.sin(angle) * radius - zOffset;
//     mesh.transforms.translation = new Vector3({ x, z });
//     scene.add(mesh);
//   }),
// );

new TestObject().loadMesh().then((mesh) => {
  //mesh.transforms.translation = new Vector3({ z: -5, x: 3 });
  scene.add(mesh);
});

// new Teddy().loadMesh().then((mesh) => {
//   mesh.transforms.translation = new Vector3({ z: -5, x: -3 });
//   scene.add(mesh);
// });

const camera = new CameraGameObject();
updater.add(camera);
updater.add(renderGameObject);
updater.start();
