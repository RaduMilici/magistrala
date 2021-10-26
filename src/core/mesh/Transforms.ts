import { Matrix3, Vector } from 'pulsar-pathfinding';
import { transformsConfig } from './transforms_config';

export class Transforms {
  translationMatrix: Matrix3 = new Matrix3();
  rotationMatrix: Matrix3 = new Matrix3();
  scaleMatrix: Matrix3 = new Matrix3();

  private _translation: Vector = new Vector();
  private _rotation: number = 0;
  private _scale: Vector = new Vector({ x: 1, y: 1 });

  constructor({ translation, rotation, scale }: transformsConfig) {
    this.rotation = rotation;
    this.scale = scale;
    this.translation = translation;
  }

  get translation(): Vector {
    return this._translation;
  }

  get rotation(): number {
    return this._rotation;
  }

  get scale(): Vector {
    return this._scale;
  }

  set rotation(value: number) {
    this._rotation = value;
    this.rotationMatrix = Transforms.getRotationMatrix(value);
  }

  set scale(value: Vector) {
    this._scale = this.createScaleProxy();
    this._scale.x = value.x;
    this._scale.y = value.y;
  }

  set translation(value: Vector) {
    this._translation = this.createTranslationProxy();
    this._translation.x = value.x;
    this._translation.y = value.y;
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

  private createTranslationProxy(): Vector {
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
  }
}
