import { Color } from '../../../core/color/Color';
import { GameObject3D } from '../../../core/ecs/GameObject3D';
import { BasicMaterial } from '../../../core/material/basic_material/BasicMaterial';
import { Mesh } from '../../../core/mesh/Mesh';
import { Texture } from '../../../core/texture/Texture';
import { ObjLoader } from '../../../loader/ObjLoader';
import { app, updater } from '../../app';
import { ImgUrl, ObjUrl } from '../obj_url';
import { Rotate } from './Rotate.component';

function* generator() {
  let a = 0;
  const t = [ImgUrl.BLOODBRAND, ImgUrl.CHECKER, ImgUrl.BLENDER_CHECKER];
  yield t[a++ % 2];
}

export class TestObject extends GameObject3D {
  constructor() {
    super({ name: 'teddy' });
  }

  async TEST_loadMeshWithTexture(texture: Texture): Promise<Mesh> {
    const { triangles } = await ObjLoader.load(ObjUrl.BLOODBRAND);
    //triangles.forEach((triangle) => (triangle.color = Color.random()));
    this.mesh = app.newMesh({
      geometry: app.newGeometry({ triangles }),
      //material: app.newBasicMaterial(),
      material: app.newBasicMaterial({ texture }),
    });
    this.addComponent(new Rotate());
    updater.add(this);
    this.TEST_changeTexture();
    //this.TEST_changeRandomColor();
    return this.mesh;
  }

  TEST_changeTexture() {
    const material = this.mesh.material as BasicMaterial;
    const texture = generator();
    setInterval(() => {
      const a = texture.next();
      if (!a.done) {
        material.texture = a.value;
      }
      //material.texture = app.newTexture({ src: ImgUrl.BLENDER_CHECKER });
    }, 1000);
  }

  TEST_changeRandomColor() {
    setInterval(() => {
      const material = this.mesh.material as BasicMaterial;
      material.color = Color.random();
    }, 1000);
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
    this.addComponent(new Rotate());
    updater.add(this);
    return this.mesh;
  }
}
