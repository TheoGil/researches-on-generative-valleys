import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three';
import OrbitControls from 'orbit-controls-es6';
import * as dat from 'dat.gui';
import Terrain from './Terrain';

class App {
  constructor() {
    this.scene = null;
    this.terrain = null;
    this.camera = null;
    this.renderer = null;
    this.GUI = null;
  }

  init() {
    this.initGUI();
    this.setupScene();
    this.setupCamera();
    this.setupTerrain();
    this.render();
  }

  initGUI() {
    this.GUI = new dat.GUI();
  }

  setupScene() {
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: document.getElementById('js-canvas'),
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xEEEEEE, 1);
  }

  setupTerrain() {
    this.terrain = new Terrain({
      scene: this.scene,
      GUI: this.GUI,
    });
  }

  setupCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 50;
    this.camera.position.y = 25;
    this.camera.lookAt(0, 0, 0);
    new OrbitControls(this.camera, this.renderer.domElement);
  }

  render() {
    this.terrain.render();

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const app = new App();
app.init();
