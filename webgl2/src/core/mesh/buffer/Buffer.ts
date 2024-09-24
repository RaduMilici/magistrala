import { Errors } from '../../errors';
import { Locations } from '../locations/Locations';
import { bufferConfig } from './buffer_configs';

export abstract class Buffer {
  public static readonly STRIDE = 0;
  public static readonly OFFSET = 0;

  public readonly glBuffer: WebGLBuffer;
  protected context: WebGL2RenderingContext;
  protected locations: Locations;

  protected constructor({ context, locations }: bufferConfig) {
    this.context = context;
    this.locations = locations;
    this.glBuffer = Buffer.createGlBuffer(this.context);
    context.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.glBuffer);
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
