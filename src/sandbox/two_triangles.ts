import { Renderer } from '../core/renderer/Renderer';
import { VertexShader } from '../core/shader/VertexShader';
import { FragmentShader } from '../core/shader/FragmentShader';
import { Mesh } from '../core/mesh/Mesh';
import { Geometry } from '../core/geometry/Geometry';
import vertexShaderSource from '../shaders/vertex_shader.glsl';
import fragmentShaderSource from '../shaders/fragment_shader.glsl';
import { Triangle } from '../core/Triangle';
import { Vector2 } from '../core/Vector2';
import { Scene } from '../core/scene/Scene';
import { Color } from '../core/color/Color';

const renderer = new Renderer({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 800 },
});

renderer.setClearColor(new Color({ r: 0, g: 1, b: 0, a: 1 }));

const vertexShader = new VertexShader({
  context: renderer.context,
  source: vertexShaderSource,
});

const fragmentShader = new FragmentShader({
  context: renderer.context,
  source: fragmentShaderSource,
});

const geometry = new Geometry({
  triangles: [
    new Triangle(new Vector2(0, 0), new Vector2(0, 1), new Vector2(1, 0)),
    new Triangle(new Vector2(0, 0), new Vector2(0, -1), new Vector2(-1, 0)),
  ],
});

const mesh = new Mesh({
  context: renderer.context,
  vertexShader,
  fragmentShader,
  geometry,
});

const scene = new Scene();
scene.add(mesh);

renderer.render(scene);
