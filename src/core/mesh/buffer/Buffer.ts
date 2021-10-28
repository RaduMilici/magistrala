import { Errors } from '../../errors';
import { bufferConfig } from './buffer_configs';
import { Locations } from '../Locations';

export abstract class Buffer {
  readonly glBuffer: WebGLBuffer;
  protected context: WebGL2RenderingContext;
  protected locations: Locations;

  protected constructor({ context, locations }: bufferConfig) {
    this.context = context;
    this.locations = locations;
    this.glBuffer = Buffer.createGlBuffer(this.context);
  }

  public abstract enableAttributes(): void;

  protected abstract setBufferData(): void;

  private static createGlBuffer(context: WebGL2RenderingContext): WebGLBuffer {
    const buffer = context.createBuffer();

    if (buffer === null) {
      throw new Error(Errors.COULD_NOT_CREATE_BUFFER);
    }

    return buffer;
  }
}
