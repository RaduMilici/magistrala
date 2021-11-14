import { Matrix4 } from 'pulsar-pathfinding';

import { Object3D } from '../Object3D';
import { Geometry } from '../geometry/Geometry';
import { DirectionalLight } from '../lights/directional_light/DirectionalLight';
import { Material } from '../material/Material';
import { MeshBuffers } from './buffer/MeshBuffers';
import { MeshLocations } from './locations/MeshLocations';
import { meshConfig } from './mesh_config';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export class Mesh extends Object3D {
  public perspectiveMatrix: PerspectiveMatrix;
  public material: Material;

  public readonly geometry: Geometry;
  public readonly directionalLights: Array<DirectionalLight> = [];

  private readonly context: WebGL2RenderingContext;

  private meshBuffers: MeshBuffers;
  private meshLocations: MeshLocations;

  constructor({ context, geometry, perspectiveMatrix, material }: meshConfig) {
    super();
    this.context = context;
    this.geometry = geometry;
    this.material = material;
    this.perspectiveMatrix = perspectiveMatrix;
    const vao = this.context.createVertexArray();
    this.context.bindVertexArray(vao);
    this.meshLocations = new MeshLocations({
      context,
      program: this.material.program,
    });
    this.meshBuffers = new MeshBuffers({
      context,
      geometry,
      positionLocations: this.meshLocations.transformLocations,
    });

    if (geometry.textureCoordinates !== null) {
      this.material.textureCoordinates = geometry.textureCoordinates;
    }
  }

  public prepareForRender(cameraMatrix: Matrix4) {
    this.material.program.use();
    this.material.bindTexture();
    const { elements } = this.perspectiveMatrix
      .multiply(cameraMatrix)
      .multiply(this.transforms.translationMatrix)
      .multiply(this.transforms.xRotationMatrix)
      .multiply(this.transforms.yRotationMatrix)
      .multiply(this.transforms.zRotationMatrix)
      .multiply(this.transforms.scaleMatrix);
    this.context.uniformMatrix4fv(
      this.meshLocations.transformLocations.matrixUniformLocation,
      false,
      elements,
    );
  }
}
