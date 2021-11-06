import { uniqueId } from 'pulsar-pathfinding';

import { Vector3 } from '../../Vector3';
import { directionalLightConfig } from './directional_light_config';

export class DirectionalLight {
  id: string = uniqueId();
  direction: Vector3;
  private readonly context: WebGL2RenderingContext;

  constructor({ context, direction }: directionalLightConfig) {
    this.context = context;
    this.direction = direction;
  }

  setUniform(reverseLightUniformLocation: WebGLUniformLocation) {
    this.context.uniform3fv(reverseLightUniformLocation, this.direction.values);
  }
}
