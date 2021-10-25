import { Matrix3, Vector } from 'pulsar-pathfinding';
import { transformsConfig } from './transforms_config';

export class Transforms {
  translation: Matrix3;
  rotation: Matrix3;
  scale: Matrix3;

  constructor({ translation, rotation, scale }: transformsConfig) {
    this.translation = Transforms.getTranslationMatrix(translation);
    this.rotation = Transforms.getRotationMatrix(rotation);
    this.scale = Transforms.getScaleMatrix(scale);
  }

  private static getTranslationMatrix({ x, y }: Vector): Matrix3 {
    return new Matrix3(1, 0, 0, 0, 1, 0, x, y, 1);
  }

  private static getRotationMatrix(radians: number): Matrix3 {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new Matrix3(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
  }

  private static getScaleMatrix({ x, y }: Vector): Matrix3 {
    return new Matrix3(x, 0, 0, 0, y, 0, 0, 0, 1);
  }
}
