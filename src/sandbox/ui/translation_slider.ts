import { GUI } from 'dat.gui';
import { Mesh } from '../../core/mesh/Mesh';

const gui = new GUI();

export const makeTranslationSlider = (folderName: string, mesh: Mesh): GUI => {
  const folder = gui.addFolder(folderName);
  const positionFolder = folder.addFolder('position');
  positionFolder.add(mesh.translation, 'x', -1, 1).step(0.001);
  positionFolder.add(mesh.translation, 'y', -1, 1).step(0.001);
  positionFolder.open();

  const rotationFolder = folder.addFolder('rotation');
  rotationFolder.add(mesh, 'rotation', 0, 6.28).step(0.001);
  rotationFolder.open();

  const scaleFolder = folder.addFolder('scale');
  scaleFolder.add(mesh.scale, 'x', -1, 1).step(0.001);
  scaleFolder.add(mesh.scale, 'y', -1, 1).step(0.001);
  scaleFolder.open();

  folder.open();
  return folder;
};
