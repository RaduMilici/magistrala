import { Vector3 } from '../../Vector3';
import { DirectionalLightLocations } from '../../mesh/locations/DirectionalLightLocations';
import { directionalLightConfig } from './directional_light_config';

export class DirectionalLight {
  direction: Vector3;
  private readonly directionalLightLocations: DirectionalLightLocations;
  private readonly context: WebGL2RenderingContext;

  constructor({ context, direction, program }: directionalLightConfig) {
    this.context = context;
    this.direction = direction;
    this.directionalLightLocations = new DirectionalLightLocations({
      context,
      program,
    });
  }

  setUniform() {
    this.context.uniform3fv(
      this.directionalLightLocations.reverseLightUniformLocation,
      this.direction.values,
    );
  }
}
