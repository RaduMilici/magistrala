import { uniqueId } from 'pulsar-pathfinding';
import { Camera } from '../Camera';
import { Mesh } from '../mesh/Mesh';

export class Scene {
  readonly id: string = uniqueId();
  readonly children: Array<Mesh> = [];

  add(child: Mesh) {
    this.children.push(child);
  }

  render(context: WebGL2RenderingContext, camera: Camera) {
    this.children.forEach((child) => {
      child.prepareForRender(camera.invertedMatrix);
      context.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, child.vertCount);
    });
  }
}
