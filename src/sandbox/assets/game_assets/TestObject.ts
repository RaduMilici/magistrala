import { Color } from '../../../core/color/Color';
import { GameObject3D } from '../../../core/ecs/GameObject3D';
import { BasicMaterial } from '../../../core/material/basic_material/BasicMaterial';
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
    //const texture2 = app.newTexture({ src: ImgUrl.BLOODBRAND });
    this.mesh = app.newMesh({
      geometry: app.newGeometry({ triangles }),
      material: app.newBasicMaterial({ texture, color: Color.RED }),
    });
    setInterval(() => {
      const material = this.mesh.material as BasicMaterial;
      material.color = Color.random();
    }, 1000);
    // setTimeout(() => {
    //     const material = this.mesh.material as BasicMaterial;
    //     material.tex = Color.random();
    // }, 2000)
    this.addComponent(new Rotate());
    updater.add(this);
    return this.mesh;
  }
}
