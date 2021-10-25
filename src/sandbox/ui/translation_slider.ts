import { GUI } from 'dat.gui';
import { Mesh } from '../../core/mesh/Mesh';

const gui = new GUI();

export const makeTranslationSlider = (folderName: string, mesh: Mesh): GUI => {
  const folder = gui.addFolder(folderName);
  folder.add(mesh.translation, 'x', -1, 1).step(0.001);
  folder.add(mesh.translation, 'y', -1, 1).step(0.001);
  folder.open();
  return folder;
};
