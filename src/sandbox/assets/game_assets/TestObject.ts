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
    const { triangles } = await new ObjLoader().load(ObjUrl.BLOODBRAND);
    triangles.forEach((triangle) => (triangle.color = Color.random()));
    this.mesh = app.newMesh({
      geometry: app.newGeometry({ triangles }),
      texture: app.newTexture({ src: ImgUrl.BLOODBRAND }),
      material: app.newMaterial(),
    });
    this.addComponent(new Rotate());
    updater.add(this);
    return this.mesh;
  }
}
