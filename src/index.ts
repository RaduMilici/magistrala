import { Renderer } from './core/renderer/Renderer';
import { VertexShader } from './core/shader/VertexShader';
import { FragmentShader } from './core/shader/FragmentShader';
import { Program } from './core/program/Program';
import vertexShaderSource from './shaders/vertex_shader.glsl';
import fragmentShaderSource from './shaders/fragment_shader.glsl';

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

const program = new Program({
  context: renderer.context,
  vertexShader,
  fragmentShader,
  debug: true,
});

console.log(renderer, vertexShader, fragmentShader, program);
