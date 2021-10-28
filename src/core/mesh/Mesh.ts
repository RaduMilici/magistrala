import { Geometry } from '../geometry/Geometry';
import { meshConfig } from './mesh_config';
import { Errors } from '../errors';
import { Program } from '../program/Program';
import { Locations } from './Locations';
import { Transforms } from './transforms/Transforms';
import { Vector3 } from '../Vector3';
import { ProjectionMatrix } from './transforms/matrices/projection/ProjectionMatrix';
import { PositionBuffer } from './buffer/PositionBuffer';

export class Mesh {
  public projectionMatrix: ProjectionMatrix = new ProjectionMatrix();

  public readonly transforms: Transforms;

  private readonly context: WebGL2RenderingContext;
  private readonly buffer: WebGLBuffer;
  private readonly program: Program;
  private readonly locations: Locations;
  private readonly geometry: Geometry;
  private readonly positionBuffer: PositionBuffer;

  constructor({
    context,
    geometry,
    projectionMatrix,
    vertexShader,
    fragmentShader,
  }: meshConfig) {
    this.context = context;
    this.geometry = geometry;
    this.projectionMatrix = projectionMatrix;
    this.transforms = new Transforms({
      translation: new Vector3(),
      rotation: new Vector3(),
      scale: new Vector3({ x: 1, y: 1, z: 1 }),
    });
    this.buffer = Mesh.createBuffer(context);
    this.program = new Program({
      context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
    this.locations = new Locations(context, this.program);
    this.positionBuffer = new PositionBuffer({
      context,
      geometry,
      locations: this.locations,
    });
  }

  get vertCount(): number {
    return this.geometry.vertexCoordinates.length / 3;
  }

  public prepareForRender() {
    this.program.use();
    this.setUniformValues();
  }

  private static createBuffer(context: WebGL2RenderingContext): WebGLBuffer {
    const buffer = context.createBuffer();

    if (buffer === null) {
      throw new Error(Errors.COULD_NOT_CREATE_BUFFER);
    }

    return buffer;
  }

  private setUniformValues() {
    const { elements } = this.projectionMatrix
      .multiply(this.transforms.translationMatrix)
      .multiply(this.transforms.xRotationMatrix)
      .multiply(this.transforms.yRotationMatrix)
      .multiply(this.transforms.zRotationMatrix)
      .multiply(this.transforms.scaleMatrix);
    this.context.uniformMatrix4fv(
      this.locations.uniformLocations.matrix,
      false,
      elements
    );
  }
}
