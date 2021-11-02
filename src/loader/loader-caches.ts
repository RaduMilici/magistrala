import { MeshData } from './MeshData';

export interface PromiseCache {
  [key: string]: Promise<Response>;
}

export interface MeshCache {
  [key: string]: MeshData;
}

export interface TextCache {
  [key: string]: Promise<string>;
}
