import { Mesh } from '../mesh/Mesh';
import { UniqueID } from '../../common/unique_id';

export class Scene {
  readonly id: number = UniqueID.get();
  readonly children: Array<Mesh> = [];

  add(child: Mesh) {
    this.children.push(child);
  }

  render(context: WebGL2RenderingContext) {
    this.children.forEach((child) => {
      child.prepareForRender();
      context.drawArrays(context.TRIANGLES, 0, child.vertCount);
    });
  }
}
