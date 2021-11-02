import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';
import { MeshData } from './MeshData';
import { MeshCache, PromiseCache, TextCache } from './loader-caches';
import { ObjSpecifiers } from './obj-specifiers';

export class ObjLoader {
  public static promiseCache: PromiseCache = {};
  public static textCache: TextCache = {};
  public static meshCache: MeshCache = {};

  public async load(path: string): Promise<MeshData> {
    if (ObjLoader.promiseCache.hasOwnProperty(path)) {
      return ObjLoader.returnFromCache(path);
    }

    ObjLoader.promiseCache[path] = fetch(path);
    const response = await ObjLoader.promiseCache[path];

    ObjLoader.textCache[path] = response.text();
    const text = await ObjLoader.textCache[path];

    ObjLoader.meshCache[path] = ObjLoader.readStringData(text);
    return ObjLoader.meshCache[path];
  }

  private static async returnFromCache(path: string): Promise<MeshData> {
    await ObjLoader.promiseCache[path];
    await ObjLoader.textCache[path];
    return ObjLoader.meshCache[path];
  }

  private static readStringData(text: string): MeshData {
    const meshData = new MeshData();
    const rows = text.split('\n');
    rows.forEach((element) => {
      const [specifier, ...values] = element.split(' ');
      switch (specifier) {
        case ObjSpecifiers.VERTEX:
          ObjLoader.assignVertex(values, meshData);
          break;
        case ObjSpecifiers.FACE:
          ObjLoader.assignTriangle(values, meshData);
      }
    });
    return meshData;
  }

  private static assignVertex(
    vertexCoordinates: Array<string>,
    meshData: MeshData,
  ) {
    const [x, y, z] = vertexCoordinates.map(parseFloat);
    meshData.vertices.push(new Vector3({ x, y, z }));
  }

  private static assignTriangle(
    triangleIndices: Array<string>,
    meshData: MeshData,
  ) {
    const vertexIndices: Array<number> = [];
    triangleIndices.forEach((index) => {
      // TODO: implement textureCoord and normal once supported
      const [position, textureCoord, normal] = index.split('/').map(parseFloat);
      // subtracting 1 because .obj indices are not 0 based
      vertexIndices.push(position - 1);
    });
    const [aIndex, bIndex, cIndex] = vertexIndices;
    const a = meshData.vertices[aIndex];
    const b = meshData.vertices[bIndex];
    const c = meshData.vertices[cIndex];
    meshData.triangles.push(new Triangle({ a, b, c }));
  }
}
