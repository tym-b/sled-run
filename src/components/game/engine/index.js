import Scene from './scene';
import Camera from './camera';
import Renderer from './renderer';
import Light from './light';
import objects from './objects';


export default class Engine {
  constructor(renderTarget) {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.light = new Light();

    this.scene.add(this.light);
    this.scene.add(this.camera);

    renderTarget.appendChild(this.renderer.domElement);

    this.loadObjects();
  }

  async loadObjects() {
    const instances = objects.map(SceneObject => new SceneObject());

    await Promise.all(instances.map(instance => instance.load()));

    this.scene.add(...instances);
  }

  updateViewport = () => {
    this.renderer.updateViewport();
    this.camera.updateViewport();
  };

  render = () => this.renderer.render(this.scene, this.camera);

  loop = () => {
    requestAnimationFrame(this.loop);
    this.render();
  }

  init = () => requestAnimationFrame(this.loop);
}
