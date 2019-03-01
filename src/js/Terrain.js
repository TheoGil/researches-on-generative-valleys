import {
  ShaderMaterial,
  Mesh,
  PlaneBufferGeometry,
  DoubleSide,
} from 'three';
import glslify from 'glslify';
import vertexShader from '../shaders/terrain_vertex.glsl';
import fragmentShader from '../shaders/terrain_fragment.glsl';

class Terrain {
  constructor(options) {
    this.scene = options.scene;
    this.GUI = options.GUI;
    this.params = {
      speed: 0.01,
    };
    this.initMesh();
    this.initGUI();
  }

  initMesh() {
    const uniforms = {
      u_amp: { type: 'f', value: -10.0 },
      u_center: { type: 'f', value: 0.001 },
      u_width: { type: 'f', value: 20.0 },
      u_time: { type: 'f', value: 0.0 },
    };
    const material = new ShaderMaterial({
      uniforms,
      vertexShader: glslify(vertexShader),
      fragmentShader,
      side: DoubleSide,
      wireframe: true,
      transparent: true,
    });
    this.mesh = new Mesh(new PlaneBufferGeometry(50, 50, 50, 50), material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.mesh);
  }

  initGUI() {
    this.GUI.add(this.mesh.material.uniforms.u_amp, 'value', -10, 10)
      .name('Amplitude');
    this.GUI.add(this.mesh.material.uniforms.u_center, 'value', -1, 1)
      .name('Center offset');
    this.GUI.add(this.mesh.material.uniforms.u_width, 'value', 0.0, 50.0)
        .name('Valley width');
    this.GUI.add(this.params, 'speed', 0.0, 0.01)
        .name('Speed');
  }

  render() {
    this.mesh.material.uniforms.u_time.value += this.params.speed;
  }
}

export default Terrain;
