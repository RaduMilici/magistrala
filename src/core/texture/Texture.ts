import { Color } from '../color/Color';
import { textureConfig } from './texture_config';

export class Texture {
  private readonly context: WebGL2RenderingContext;
  private readonly glTexture: WebGLTexture | null;
  private readonly src: string | undefined;
  private readonly image: HTMLImageElement | undefined;

  constructor({ context, src, image }: textureConfig) {
    this.context = context;
    this.glTexture = this.context.createTexture();
    this.src = src;
    this.image = image;
    if (this.image !== undefined) {
      this.bindTexture(this.image);
    } else if (this.src !== undefined) {
      this.bindBlankTexture();
      this.load(this.src);
    } else {
      this.bindBlankTexture();
    }
  }

  public bind() {
    this.context.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.glTexture);
  }

  private load(src: string) {
    const image = new Image();
    image.src = src;
    image.crossOrigin = 'anonymous';
    image.addEventListener('load', () => {
      this.bindTexture(image);
      this.context.generateMipmap(WebGL2RenderingContext.TEXTURE_2D);
    });
  }

  private bindTexture(image: HTMLImageElement) {
    this.context.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.glTexture);
    this.context.texImage2D(
      WebGL2RenderingContext.TEXTURE_2D,
      0,
      WebGL2RenderingContext.RGBA,
      image.width,
      image.height,
      0,
      WebGL2RenderingContext.RGBA,
      WebGL2RenderingContext.UNSIGNED_BYTE,
      image,
    );
  }

  private bindBlankTexture() {
    this.context.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.glTexture);
    this.context.texImage2D(
      WebGL2RenderingContext.TEXTURE_2D,
      0,
      WebGL2RenderingContext.RGBA,
      1,
      1,
      0,
      WebGL2RenderingContext.RGBA,
      WebGL2RenderingContext.UNSIGNED_BYTE,
      new Uint8Array(Color.random255().values),
    );
  }
}
