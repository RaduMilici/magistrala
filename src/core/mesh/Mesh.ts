import { Matrix4 } from 'pulsar-pathfinding';

import { Object3D } from '../Object3D';
import { Geometry } from '../geometry/Geometry';
import { DirectionalLight } from '../lights/directional_light/DirectionalLight';
import { Program } from '../program/Program';
import { Texture } from '../texture/Texture';
import { MeshBuffers } from './buffer/MeshBuffers';
import { MeshLocations } from './locations/MeshLocations';
import { meshConfig } from './mesh_config';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export class Mesh extends Object3D {
  public perspectiveMatrix: PerspectiveMatrix;

  public readonly geometry: Geometry;
  public readonly directionalLights: Array<DirectionalLight> = [];

  private readonly texture: Texture;
  private readonly context: WebGL2RenderingContext;
  private readonly program: Program;

  private meshBuffers: MeshBuffers;
  private meshLocations: MeshLocations;

  constructor({
    context,
    geometry,
    perspectiveMatrix,
    vertexShader,
    fragmentShader,
    texture,
  }: meshConfig) {
    super();
    this.context = context;
    this.geometry = geometry;
    this.perspectiveMatrix = perspectiveMatrix;
    this.texture = texture;
    const vao = this.context.createVertexArray();
    this.context.bindVertexArray(vao);
    this.program = new Program({
      context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
    this.meshLocations = new MeshLocations({ context, program: this.program });
    this.meshBuffers = new MeshBuffers({
      context,
      geometry,
      positionLocations: this.meshLocations.positionLocations,
      colorLocations: this.meshLocations.colorLocations,
      textureCoordLocations: this.meshLocations.textureCoordLocations,
      normalLocations: this.meshLocations.normalLocations,
    });
  }

  get vertCount(): number {
    return this.geometry.positionCoordinates.length / 3;
  }

  public prepareForRender(cameraMatrix: Matrix4) {
    this.program.use();
    this.setUniformValues(cameraMatrix);
    this.texture.bind();
  }

  private setUniformValues(cameraMatrix: Matrix4) {
    this.directionalLights.forEach((directionalLight) =>
      directionalLight.setUniform(
        this.meshLocations.directionalLightLocations
          .reverseLightUniformLocation,
      ),
    );
    const { elements } = this.perspectiveMatrix
      .multiply(cameraMatrix)
      .multiply(this.transforms.translationMatrix)
      .multiply(this.transforms.xRotationMatrix)
      .multiply(this.transforms.yRotationMatrix)
      .multiply(this.transforms.zRotationMatrix)
      .multiply(this.transforms.scaleMatrix);
    this.context.uniformMatrix4fv(
      this.meshLocations.positionLocations.matrixUniformLocation,
      false,
      elements,
    );
  }
}
