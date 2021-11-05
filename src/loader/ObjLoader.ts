import { Vector } from 'pulsar-pathfinding';

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
      ObjLoader.assignTextByIdentifier(await ObjLoader.textCache.get(path)),
    );
    return ObjLoader.assignValuesFromText(ObjLoader.meshCache.get(path));
  }

  private static async returnFromCache(path: string): Promise<MeshData> {
    await ObjLoader.promiseCache.get(path);
    await ObjLoader.textCache.get(path);
    return ObjLoader.meshCache.get(path);
  }

  private static assignTextByIdentifier(text: string): MeshData {
    const meshData = new MeshData();
    const rows = text.split(ObjDelimiters.ROW);

    rows.forEach((element) => {
      const [specifier, ...values] = element.split(ObjDelimiters.VALUES);
      switch (specifier) {
        case ObjSpecifiers.VERTEX:
          meshData.verticesText.push(values);
          break;
        case ObjSpecifiers.TEXTURE_COORD:
          meshData.textureCoordsText.push(values);
          break;
        case ObjSpecifiers.FACE:
          meshData.trianglesText.push(values);
      }
    });

    return meshData;
  }

  private static assignValuesFromText(meshData: MeshData): MeshData {
    meshData.verticesText.forEach((text) =>
      ObjLoader.assignVertex(text, meshData),
    );
    meshData.textureCoordsText.forEach((text) =>
      ObjLoader.assignTextureCoord(text, meshData),
    );
    meshData.trianglesText.forEach((text) =>
      ObjLoader.assignTriangle(text, meshData),
    );

    return meshData;
  }

  private static assignVertex(
    vertexCoordinates: Array<string>,
    meshData: MeshData,
  ) {
    const [x, y, z] = vertexCoordinates.map(parseFloat);
    meshData.vertices.push(new Vector3({ x, y, z }));
  }

  private static assignTextureCoord(
    textureCoordinates: Array<string>,
    meshData: MeshData,
  ) {
    const [x, y] = textureCoordinates.map(parseFloat);
    meshData.textureCoords.push(new Vector({ x, y }));
  }

  private static assignTriangle(
    triangleIndices: Array<string>,
    meshData: MeshData,
  ) {
    if (triangleIndices.length === Triangle.VERTEX_COUNT) {
      // triangle data in the shape of ['1/1/1', '2/2/1', '3/3/1']
      ObjLoader.assignSingleTriangle(triangleIndices, meshData);
    } else {
      // quad data in the shape of ['1/4/2', '1/5/3', '3/1/8', '4/2/7']
      ObjLoader.quadToTriangle(triangleIndices).forEach((triangleFromQuad) =>
        ObjLoader.assignSingleTriangle(triangleFromQuad, meshData),
      );
    }
  }

  private static assignSingleTriangle(
    triangleIndices: Array<string>,
    meshData: MeshData,
  ) {
    const vertexIndices: Array<{
      positionIndex: number;
      textureCoordIndex: number;
    }> = [];

    triangleIndices.forEach((index) => {
      // TODO: implement normal once supported
      const [positionIndex, textureCoordIndex, normalIndex] = index
        .split(ObjDelimiters.INDICES)
        .map(parseFloat);
      // subtracting 1 because .obj indices are not 0 based
      vertexIndices.push({
        positionIndex: positionIndex - 1,
        textureCoordIndex: textureCoordIndex - 1,
      });
    });

    const [a, b, c] = vertexIndices.map(
      ({ positionIndex, textureCoordIndex }) => {
        const vertex = meshData.vertices[positionIndex].clone();
        vertex.textureCoord = meshData.textureCoords[textureCoordIndex];
        return vertex;
      },
    );

    meshData.triangles.push(new Triangle({ a, b, c }));
  }

  private static quadToTriangle(indices: Array<string>): Array<Array<string>> {
    const triangles = [];
    const a = indices[0];
    for (let i = 0; i < indices.length / 2; i++) {
      triangles.push([a, ...indices.slice(i + 1, i + Triangle.VERTEX_COUNT)]);
    }
    return triangles;
  }
}
