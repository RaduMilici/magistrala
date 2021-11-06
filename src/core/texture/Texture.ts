import { Color } from '../color/Color';
import { textureConfig, wrapType } from './texture_config';

export class Texture {
  private _wrapT: wrapType = WebGL2RenderingContext.REPEAT;
  private _wrapS: wrapType = WebGL2RenderingContext.REPEAT;

  private readonly context: WebGL2RenderingContext;
  private readonly glTexture: WebGLTexture | null;

  constructor({ context, src, image }: textureConfig) {
    this.context = context;
    this.glTexture = this.context.createTexture();
    this.decideWhichTextureToLoad(image, src);
  }

  get wrapT(): wrapType {
    return this._wrapT;
  }

  set wrapT(value: wrapType) {
    this._wrapT = value;
    this.setWrapMode(WebGL2RenderingContext.TEXTURE_WRAP_T, value);
  }

  get wrapS(): wrapType {
    return this._wrapS;
  }

  set wrapS(value: wrapType) {
    this._wrapS = value;
    this.setWrapMode(WebGL2RenderingContext.TEXTURE_WRAP_S, value);
  }

  bind() {
    this.context.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.glTexture);
  }

  private setWrapMode(mode: number, value: wrapType) {
    this.context.texParameteri(WebGL2RenderingContext.TEXTURE_2D, mode, value);
  }

  private decideWhichTextureToLoad(
    image: HTMLImageElement | undefined,
    src: string | undefined,
  ) {
    if (image !== undefined) {
      this.bindTexture(image);
    } else if (src !== undefined) {
      this.bindBlankTexture();
      this.load(src);
    } else {
      this.bindBlankTexture();
    }
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
