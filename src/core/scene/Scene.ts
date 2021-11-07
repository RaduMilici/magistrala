import { contains, uniqueId } from 'pulsar-pathfinding';

import { Camera } from '../Camera';
import { DirectionalLight } from '../lights/directional_light/DirectionalLight';
import { Mesh } from '../mesh/Mesh';

export class Scene {
  readonly id: string = uniqueId();
  readonly children: Array<Mesh> = [];
  private readonly directionalLights: Array<DirectionalLight> = [];

  add(child: Mesh): void;
  add(child: DirectionalLight): void;
  add(child: Mesh | DirectionalLight) {
    switch (child.constructor) {
      case Mesh:
        this.children.push(child as Mesh);
        break;
      case DirectionalLight:
        this.directionalLights.push(child as DirectionalLight);
        break;
    }
    this.assignLightsToChildren();
  }

  render(context: WebGL2RenderingContext, { invertedMatrix }: Camera) {
    this.children.forEach((child) => {
      child.prepareForRender(invertedMatrix);
      context.drawArrays(
        WebGL2RenderingContext.TRIANGLES,
        0,
        child.geometry.vertCount,
      );
    });
  }

  private assignLightsToChildren() {
    this.children.forEach((child) => {
      this.directionalLights.forEach((directionalLight) => {
        if (!contains(child.directionalLights, directionalLight)) {
          child.directionalLights.push(directionalLight);
        }
      });
    });
  }
}
