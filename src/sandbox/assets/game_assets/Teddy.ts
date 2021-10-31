import { Color } from '../../../core/color/Color';
import { GameObject3D } from '../../../core/ecs/GameObject3D';
import { Mesh } from '../../../core/mesh/Mesh';
import { ObjLoader } from '../../../loader/ObjLoader';
import { app, updater } from '../../app';
import fragmentShaderSource from '../../shaders/fragment_shader.glsl';
import { vertexShaderChunks } from '../../shaders/vertex_shader_chunks';
import { ObjUrl } from '../obj_url';
import { Rotate } from './Rotate.component';

export class Teddy extends GameObject3D {
  constructor() {
    super({ name: 'teddy' });
  }

  async loadMesh(): Promise<Mesh> {
    const vertexShader = app.newVertexShader({ source: vertexShaderChunks });
    const fragmentShader = app.newFragmentShader({
      source: fragmentShaderSource,
    });
    const { triangles } = await new ObjLoader().load(ObjUrl.TEDDY);
    triangles.forEach((triangle) => (triangle.color = Color.random()));
    this.mesh = app.newMesh({
      fragmentShader,
      vertexShader,
      geometry: app.newGeometry({ triangles }),
    });
    this.addComponent(new Rotate());
    updater.add(this);
    return this.mesh;
  }
}
