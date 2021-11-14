import { Color } from '../../../core/color/Color';
import { GameObject3D } from '../../../core/ecs/GameObject3D';
import { Mesh } from '../../../core/mesh/Mesh';
import { ObjLoader } from '../../../loader/ObjLoader';
import { app, updater } from '../../app';
import { ImgUrl, ObjUrl } from '../obj_url';
import { Rotate } from './Rotate.component';

export class TestObject extends GameObject3D {
  constructor() {
    super({ name: 'teddy' });
  }

  async loadMesh(): Promise<Mesh> {
    const { triangles } = await ObjLoader.load(ObjUrl.BLOODBRAND);
    triangles.forEach((triangle) => (triangle.color = Color.random()));
    const texture = app.newTexture({ src: ImgUrl.CHECKER });
    const texture2 = app.newTexture({ src: ImgUrl.BLOODBRAND });
    const random = Math.random() > 0.5;
    const randomTexture = random ? texture : texture2;
    console.log(random);
    this.mesh = app.newMesh({
      geometry: app.newGeometry({ triangles }),
      //material: app.newBasicMaterial(),
      material: app.newBasicMaterial({ texture: randomTexture }),
    });
    // setInterval(() => {
    //   const material = this.mesh.material as BasicMaterial;
    //   material.color = Color.random();
    // }, 1000);
    // setTimeout(() => {
    //     const material = this.mesh.material as BasicMaterial;
    //     material.tex = Color.random();
    // }, 2000)
    this.addComponent(new Rotate());
    updater.add(this);
    return this.mesh;
  }
}
