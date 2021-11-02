import { Vector3 } from '../core/Vector3';
import { Mesh } from '../core/mesh/Mesh';
import { scene, updater } from './app';
import {
  RenderGameObject,
  RenderLoop,
} from './assets/game_assets/Render.gameobject';
import { Teddy } from './assets/game_assets/Teddy';

const renderGameObject = new RenderGameObject();
renderGameObject.addComponent(new RenderLoop());

const loadPromises: Array<Promise<Mesh>> = [];
for (let i = 0; i < 20; i++) {
  loadPromises.push(new Teddy().loadMesh());
}

Promise.all(loadPromises).then((meshes) =>
  meshes.forEach((mesh, index) => {
    const radius = 300;
    const zOffset = 500;
    const angle = (index * Math.PI * 2) / meshes.length;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius - zOffset;
    mesh.transforms.translation = new Vector3({ x, z });
    scene.add(mesh);
  }),
);

updater.add(renderGameObject);
updater.start();
