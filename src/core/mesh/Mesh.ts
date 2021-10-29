import { Geometry } from '../geometry/Geometry';
import { meshConfig } from './mesh_config';
import { Program } from '../program/Program';
import { Transforms } from './transforms/Transforms';
import { Vector3 } from '../Vector3';
import { ProjectionMatrix } from './transforms/matrices/projection/ProjectionMatrix';
import { PositionBuffer } from './buffer/PositionBuffer';
import { TriangleColorBuffer } from './buffer/TriangleColorBuffer';
import { PositionLocations } from './locations/PositionLocations';
import { ColorLocations } from './locations/ColorLocations';

export class Mesh {
  public projectionMatrix: ProjectionMatrix = new ProjectionMatrix();

  public readonly transforms: Transforms;

  private readonly context: WebGL2RenderingContext;
  private readonly program: Program;
  private readonly geometry: Geometry;

  private readonly positionLocations: PositionLocations;
  private readonly colorLocations: ColorLocations | null = null;

  private positionBuffer: PositionBuffer | null = null;
  private triangleColorBuffer: TriangleColorBuffer | null = null;

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
    const vao = this.context.createVertexArray();
    this.context.bindVertexArray(vao);
    this.transforms = new Transforms({
      translation: new Vector3(),
      rotation: new Vector3(),
      scale: new Vector3({ x: 1, y: 1, z: 1 }),
    });
    this.program = new Program({
      context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
    this.positionLocations = new PositionLocations({
      context,
      program: this.program,
    });

    if (this.geometry.hasTriangleColors) {
      this.colorLocations = new ColorLocations({
        context,
        program: this.program,
      });
    }

    this.createBuffers();
  }

  get vertCount(): number {
    return this.geometry.vertexCoordinates.length / 3;
  }

  public prepareForRender() {
    this.program.use();
    this.setUniformValues();
  }

  private setUniformValues() {
    const { elements } = this.projectionMatrix
      .multiply(this.transforms.translationMatrix)
      .multiply(this.transforms.xRotationMatrix)
      .multiply(this.transforms.yRotationMatrix)
      .multiply(this.transforms.zRotationMatrix)
      .multiply(this.transforms.scaleMatrix);
    this.context.uniformMatrix4fv(
      this.positionLocations.matrixUniformLocation,
      false,
      elements
    );
  }

  private createBuffers() {
    const { context, geometry } = this;

    this.positionBuffer = new PositionBuffer({
      context,
      vertexCoordinates: geometry.vertexCoordinates,
      locations: this.positionLocations,
    });

    if (this.geometry.hasTriangleColors && this.colorLocations) {
      this.triangleColorBuffer = new TriangleColorBuffer({
        context,
        triangleColors: this.geometry.triangleColors,
        locations: this.colorLocations,
      });
    }
  }
}
