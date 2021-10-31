import { DegToRad, Updater, size } from 'pulsar-pathfinding';
import { App } from '../app/App';
import { Color } from '../core/color/Color';

const rendererSize: size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const app = new App({
  container: document.getElementById('magistrala-app'),
  size: rendererSize,
  fov: DegToRad(60),
  aspect: rendererSize.width / rendererSize.height,
  near: 1,
  far: 1000,
});
app.renderer.setClearColor(Color.from255({ r: 40, g: 44, b: 52 }));
const scene = app.newScene();
const updater = new Updater();

app.addScene(scene);

export { app, updater, scene };
