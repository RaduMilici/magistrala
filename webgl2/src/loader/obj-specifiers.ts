export enum ObjSpecifiers {
  VERTEX = 'v',
  FACE = 'f',
  TEXTURE_COORD = 'vt',
  NORMAL = 'vn',
}

export enum ObjDelimiters {
  ROW = '\n',
  VALUES = ' ',
  INDICES = '/',
}

export type vertexIndices = Array<{
  positionIndex: number;
  textureCoordIndex: number;
  normalIndex: number;
}>;
