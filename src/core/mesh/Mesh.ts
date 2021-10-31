import { Vector3 } from '../Vector3';
import { Geometry } from '../geometry/Geometry';
import { Program } from '../program/Program';
import { PositionBuffer } from './buffer/PositionBuffer';
import { TriangleColorBuffer } from './buffer/TriangleColorBuffer';
import { ColorLocations } from './locations/ColorLocations';
import { PositionLocations } from './locations/PositionLocations';
import { meshConfig } from './mesh_config';
import { Transforms } from './transforms/Transforms';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export class Mesh {
  public perspectiveMatrix: PerspectiveMatrix;

  public readonly transforms: Transforms;
  public readonly geometry: Geometry;

  private readonly context: WebGL2RenderingContext;
  private readonly program: Program;

  private readonly positionLocations: PositionLocations;
  private readonly colorLocations: ColorLocations;

  private positionBuffer: PositionBuffer | null = null;
  private triangleColorBuffer: TriangleColorBuffer | null = null;

  constructor({
    context,
    geometry,
    perspectiveMatrix,
    vertexShader,
    fragmentShader,
  }: meshConfig) {
    this.context = context;
    this.geometry = geometry;
    this.perspectiveMatrix = perspectiveMatrix;
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

    this.colorLocations = new ColorLocations({
      context,
      program: this.program,
    });

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
    const { elements } = this.perspectiveMatrix
      .multiply(this.transforms.translationMatrix)
      .multiply(this.transforms.xRotationMatrix)
      .multiply(this.transforms.yRotationMatrix)
      .multiply(this.transforms.zRotationMatrix)
      .multiply(this.transforms.scaleMatrix);
    this.context.uniformMatrix4fv(
      this.positionLocations.matrixUniformLocation,
      false,
      elements,
    );
  }

  private createBuffers() {
    const { context, geometry } = this;

    this.positionBuffer = new PositionBuffer({
      context,
      vertexCoordinates: geometry.vertexCoordinates,
      locations: this.positionLocations,
    });

    this.triangleColorBuffer = new TriangleColorBuffer({
      context,
      triangleColors: this.geometry.triangleColors,
      locations: this.colorLocations,
    });
  }
}
