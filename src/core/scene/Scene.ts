import { uniqueId } from 'pulsar-pathfinding';
import { Mesh } from '../mesh/Mesh';

export class Scene {
  readonly id: string = uniqueId();
  readonly children: Array<Mesh> = [];

  add(child: Mesh) {
    this.children.push(child);
  }

  render(context: WebGL2RenderingContext) {
    this.children.forEach((child) => {
      child.prepareForRender();
      context.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, child.vertCount);
    });
  }
}
