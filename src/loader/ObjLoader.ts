import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';
import { Cache } from './Cache';
import { MeshData } from './MeshData';
import { ObjDelimiters, ObjSpecifiers } from './obj-specifiers';

export class ObjLoader {
  public static promiseCache = new Cache<Promise<Response>>();
  public static textCache = new Cache<Promise<string>>();
  public static meshCache = new Cache<MeshData>();

  public async load(path: string): Promise<MeshData> {
    if (ObjLoader.promiseCache.has(path)) {
      return ObjLoader.returnFromCache(path);
    }
    ObjLoader.promiseCache.set(path, fetch(path));
    ObjLoader.textCache.set(
      path,
      (await ObjLoader.promiseCache.get(path)).text(),
    );
    ObjLoader.meshCache.set(
      path,
      ObjLoader.read(await ObjLoader.textCache.get(path)),
    );
    return ObjLoader.meshCache.get(path);
  }

  private static async returnFromCache(path: string): Promise<MeshData> {
    await ObjLoader.promiseCache.get(path);
    await ObjLoader.textCache.get(path);
    return ObjLoader.meshCache.get(path);
  }

  private static read(text: string): MeshData {
    const meshData = new MeshData();
    const rows = text.split(ObjDelimiters.ROW);
    rows.forEach((element) => {
      const [specifier, ...values] = element.split(ObjDelimiters.VALUES);
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
      const [position, textureCoord, normal] = index
        .split(ObjDelimiters.INDICES)
        .map(parseFloat);
      // subtracting 1 because .obj indices are not 0 based
      vertexIndices.push(position - 1);
    });
    const [a, b, c] = vertexIndices.map((i) => meshData.vertices[i]);
    meshData.triangles.push(new Triangle({ a, b, c }));
  }
}
