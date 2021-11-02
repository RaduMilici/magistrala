import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';

enum Specifiers {
  VERTEX = 'v',
  FACE = 'f',
}

interface LoosePromiseObject {
  [key: string]: Promise<Response>;
}

interface LooseMeshObject {
  [key: string]: MeshData;
}

interface LooseTextObject {
  [key: string]: Promise<string>;
}

export class MeshData {
  vertices: Array<Vector3> = [];
  triangles: Array<Triangle> = [];
}

export class ObjLoader {
  public static promiseCache: LoosePromiseObject = {};
  public static meshCache: LooseMeshObject = {};
  public static textCache: LooseTextObject = {};

  public async load(path: string): Promise<MeshData> {
    if (ObjLoader.promiseCache[path] !== undefined) {
      return ObjLoader.returnFromCache(path);
    }

    ObjLoader.promiseCache[path] = fetch(path);
    const response = await ObjLoader.promiseCache[path];

    ObjLoader.textCache[path] = response.text();
    const text = await ObjLoader.textCache[path];

    ObjLoader.meshCache[path] = this.readStringData(text);
    return ObjLoader.meshCache[path];
  }

  private static async returnFromCache(path: string): Promise<MeshData> {
    await ObjLoader.promiseCache[path];
    await ObjLoader.textCache[path];
    return ObjLoader.meshCache[path];
  }

  private readStringData(text: string): MeshData {
    const meshData = new MeshData();
    const elements = text.split('\n');
    elements.forEach((element) => {
      const [specifier, ...rest] = element.split(' ');
      switch (specifier) {
        case Specifiers.VERTEX:
          ObjLoader.assignVertex(rest, meshData);
          break;
        case Specifiers.FACE:
          ObjLoader.assignTriangle(rest, meshData);
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
      vertexIndices.push(position - 1);
    });
    const [aIndex, bIndex, cIndex] = vertexIndices;
    const a = meshData.vertices[aIndex];
    const b = meshData.vertices[bIndex];
    const c = meshData.vertices[cIndex];
    meshData.triangles.push(new Triangle({ a, b, c }));
  }
}
