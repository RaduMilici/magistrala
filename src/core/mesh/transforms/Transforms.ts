import { Matrix4 } from 'pulsar-pathfinding';

import { Vector3 } from '../../Vector3';
import { transformsConfig } from '../transforms_config';
import { ScaleMatrix } from './matrices/ScaleMatrix';
import { TranslationMatrix } from './matrices/TranslationMatrix';
import { XRotationMatrix } from './matrices/rotation/XRotationMatrix';
import { YRotationMatrix } from './matrices/rotation/YRotationMatrix';
import { ZRotationMatrix } from './matrices/rotation/ZRotationMatrix';

export class Transforms {
  translationMatrix: Matrix4 = new Matrix4();
  xRotationMatrix: Matrix4 = new Matrix4();
  yRotationMatrix: Matrix4 = new Matrix4();
  zRotationMatrix: Matrix4 = new Matrix4();
  scaleMatrix: Matrix4 = new Matrix4();

  private _translation: Vector3 = new Vector3();
  private _rotation: Vector3 = new Vector3();
  private _scale: Vector3 = new Vector3();

  constructor({ translation, rotation, scale }: transformsConfig) {
    this.rotation = rotation;
    this.scale = scale;
    this.translation = translation;
  }

  get translation(): Vector3 {
    return this._translation;
  }

  get rotation(): Vector3 {
    return this._rotation;
  }

  get scale(): Vector3 {
    return this._scale;
  }

  set rotation(value: Vector3) {
    this._rotation = value;
    this.xRotationMatrix = new XRotationMatrix(Transforms.getSinCos(value.x));
    this.yRotationMatrix = new YRotationMatrix(Transforms.getSinCos(value.y));
    this.zRotationMatrix = new ZRotationMatrix(Transforms.getSinCos(value.z));
  }

  set scale(value: Vector3) {
    this._scale = value;
    this.scaleMatrix = new ScaleMatrix(value);
  }

  set translation(value: Vector3) {
    this._translation = value;
    this.translationMatrix = new TranslationMatrix(value);
  }

  /*private createTranslationProxy(): Vector {
    return this.createProxy(
      'translation',
      () =>
        (this.translationMatrix = Transforms.getTranslationMatrix(
          this._translation
        ))
    );
  }

  private createScaleProxy(): Vector {
    return this.createProxy(
      'scale',
      () => (this.scaleMatrix = Transforms.getScaleMatrix(this._scale))
    );
  }

  private createProxy(propertyKey: string, onChange: () => void): Vector {
    return new Proxy(Reflect.get(this, propertyKey), {
      set: (target: Vector, p: string, value: number): boolean => {
        Reflect.set(target, p, value);
        onChange();
        return true;
      },
    });
  }*/

  private static getSinCos(radians: number): { sin: number; cos: number } {
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    return { sin, cos };
  }
}
