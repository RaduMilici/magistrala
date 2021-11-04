import { Matrix4 } from 'pulsar-pathfinding';
import { Object3D } from '../Object3D';
import { Geometry } from '../geometry/Geometry';
import { Program } from '../program/Program';
import { PositionBuffer } from './buffer/PositionBuffer';
import { TriangleColorBuffer } from './buffer/TriangleColorBuffer';
import { ColorLocations } from './locations/ColorLocations';
import { PositionLocations } from './locations/PositionLocations';
import { meshConfig } from './mesh_config';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export class Mesh extends Object3D {
  public perspectiveMatrix: PerspectiveMatrix;

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
    super();
    this.context = context;
    this.geometry = geometry;
    this.perspectiveMatrix = perspectiveMatrix;
    const vao = this.context.createVertexArray();
    this.context.bindVertexArray(vao);
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

  public prepareForRender(cameraMatrix: Matrix4) {
    this.program.use();
    this.setUniformValues(cameraMatrix);
  }

  private setUniformValues(cameraMatrix: Matrix4) {
    const { elements } = this.perspectiveMatrix
      .multiply(cameraMatrix)
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
