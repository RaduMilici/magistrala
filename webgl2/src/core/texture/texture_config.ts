export type textureConfig = {
  context: WebGL2RenderingContext;
  image?: HTMLImageElement;
  src?: string;
};

export type wrapType =
  | WebGL2RenderingContext['REPEAT']
  | WebGL2RenderingContext['CLAMP_TO_EDGE']
  | WebGL2RenderingContext['MIRRORED_REPEAT'];
