import { Geometry } from '../geometry/Geometry';
import { meshConfig } from './mesh_config';
import { Errors } from '../errors';
import { Program } from '../program/Program';
import { Locations } from './Locations';
import { Vector2 } from '../Vector2';

export class Mesh {
  translation: Vector2 = new Vector2();

  private readonly context: WebGL2RenderingContext;
  private readonly buffer: WebGLBuffer;
  private readonly program: Program;
  private readonly locations: Locations;
  private readonly geometry: Geometry;

  constructor(config: meshConfig) {
    this.context = config.context;
    this.geometry = config.geometry;
    this.buffer = Mesh.createBuffer(this.context);
    this.program = new Program({
      context: this.context,
      vertexShader: config.vertexShader,
      fragmentShader: config.fragmentShader,
      debug: true,
    });
    this.locations = new Locations(this.context, this.program);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.geometry.vertexCoordinates,
      WebGL2RenderingContext.STATIC_DRAW
    );
    this.enableAttributes();
  }

  get vertCount(): number {
    return this.geometry.vertexCoordinates.length / 2;
  }

  public prepareForRender() {
    this.program.use();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
    this.setValues();
  }

  private static createBuffer(context: WebGL2RenderingContext): WebGLBuffer {
    const buffer = context.createBuffer();

    if (buffer === null) {
      throw new Error(Errors.COULD_NOT_CREATE_BUFFER);
    }

    return buffer;
  }

  private enableAttributes() {
    this.context.enableVertexAttribArray(
      this.locations.attributeLocations.position
    );
    // this.context.enableVertexAttribArray(
    //   this.locations.attributeLocations.vertColor
    // );
    this.context.vertexAttribPointer(
      this.locations.attributeLocations.position,
      2,
      this.context.FLOAT,
      false,
      0,
      0
    );

    // this.context.vertexAttribPointer(
    //   this.locations.attributeLocations.vertColor,
    //   3,
    //   this.context.FLOAT,
    //   false,
    //   0,
    //   2 * Float32Array.BYTES_PER_ELEMENT
    // );
  }

  private setValues() {
    this.context.uniform2fv(
      this.locations.uniformLocations.scale,
      new Float32Array([1, 1])
    );
    this.context.uniform2fv(
      this.locations.uniformLocations.translation,
      new Float32Array(this.translation.values)
    );
    this.context.uniform2fv(
      this.locations.uniformLocations.rotation,
      new Float32Array([0, 1])
    );
  }
}
