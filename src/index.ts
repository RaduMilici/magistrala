import { Renderer } from './core/renderer/Renderer';
import { VertexShader } from './core/shader/VertexShader';
import { FragmentShader } from './core/shader/FragmentShader';
import { Mesh } from './core/mesh/Mesh';
import { Geometry } from './core/geometry/Geometry';
import vertexShaderSource from './shaders/vertex_shader.glsl';
import fragmentShaderSource from './shaders/fragment_shader.glsl';
import { Triangle } from './core/Triangle';
import { Vector2 } from './core/Vector2';

const renderer = new Renderer({
  container: document.getElementById('magistrala-app'),
  size: { width: 800, height: 600 },
});

const vertexShader = new VertexShader({
  context: renderer.context,
  source: vertexShaderSource,
});

const fragmentShader = new FragmentShader({
  context: renderer.context,
  source: fragmentShaderSource,
});

const triangle = new Triangle(
  new Vector2(0, 0),
  new Vector2(1, 0),
  new Vector2(0, 1)
);

const geometry = new Geometry({ triangles: [triangle] });

const mesh = new Mesh({
  context: renderer.context,
  vertexShader,
  fragmentShader,
  geometry,
});

console.log(renderer, mesh);
