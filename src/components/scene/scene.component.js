import React, { PureComponent } from 'react';
import * as THREE from 'three';
import { cond, pipe, equals, prop, clamp } from 'ramda';
import TWEEN from '@tweenjs/tween.js';
import debounce from 'lodash/debounce'

const LEFT_ARROW_CODE = 'ArrowLeft';
const RIGHT_ARROW_CODE = 'ArrowRight';

const clampMoveValue = clamp(-100, 100);

export default class SceneComponent extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleResize);

    this.createScene();
    this.update();
    this.animate();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResize);
  }

  animate = time => {
    requestAnimationFrame(this.animate);
    TWEEN.update(time);
  }

  createScene = () => {
    this.sceneWidth = window.innerWidth;
    this.sceneHeight = window.innerHeight;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, this.sceneWidth / this.sceneHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.camera.position.y = 1;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sceneWidth, this.sceneHeight);

    this.container.appendChild(this.renderer.domElement);

    this.configureHero();
    this.configurePlane();
    this.configureSun();
    this.configureHelpers();
  }

  moveValue = 0;

  handleKeyDown = pipe(
    prop('code'),
    cond([
      [equals(LEFT_ARROW_CODE), () => this.handleMoveLeft()],
      [equals(RIGHT_ARROW_CODE), () => this.handleMoveRight()],
    ])
  )

  configureHero = () => {
    const heroGeometry = new THREE.BoxGeometry(1, 1, 1);
    const heroMaterial = new THREE.MeshStandardMaterial({ color: 'grey' });
    this.hero = new THREE.Mesh(heroGeometry, heroMaterial);
    this.hero.castShadow = true;
    this.hero.receiveShadow = false;
    this.hero.position.y = 2;

    this.heroMoveTween = new TWEEN.Tween({
      xPositionValue: this.hero.position.x,
      zRotationValue: this.hero.rotation.z
    }).easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(({ xPositionValue, zRotationValue }) => {
        this.hero.position.x = xPositionValue;
        this.hero.rotation.z = zRotationValue;
      });

    this.scene.add(this.hero);
  }

  configurePlane = () => {
    const planeGeometry = new THREE.PlaneGeometry(15, 15, 15, 15);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 'aqua' });
    this.ground = new THREE.Mesh(planeGeometry, planeMaterial);
    this.ground.receiveShadow = true;
    this.ground.castShadow = false;
    this.ground.rotation.x = -Math.PI / 2;

    this.scene.add(this.ground);
  }

  configureSun = () => {
    this.sun = new THREE.DirectionalLight(0xffffff, 0.9);
    this.sun.position.set(0, 1, 1);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 256;
    this.sun.shadow.mapSize.height = 256;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 50;

    this.scene.add(this.sun);
  }

  configureHelpers = () => {
    const lightHelper = new THREE.DirectionalLightHelper(this.sun, 5);
    this.scene.add(lightHelper);

    const axisHelper = new THREE.AxisHelper(5);
    this.scene.add(axisHelper);

    const heroHelper = new THREE.BoxHelper(this.hero, 0xffff00);
    this.scene.add(heroHelper);
  }

  handleMoveLeft = () => this.handlePositionChange(this.moveValue -= 50);

  handleMoveRight = () => this.handlePositionChange(this.moveValue += 50);

  handlePositionChange = (newValue) => {
    const clamped = clampMoveValue(newValue);
    const x = clamped / 100 * 2;
    const z = -clamped / 100 * 15 * Math.PI / 180;

    this.animateHeroMove(x, z);
  }

  animateHeroMove = (xPositionValue, zRotationValue) => this.heroMoveTween
    .to({ xPositionValue, zRotationValue }, 500)
    .start();

  handleResize = () => {
    this.sceneWidth = window.innerWidth;
    this.sceneHeight = window.innerHeight;
    this.renderer.setSize(this.sceneWidth, this.sceneHeight);
  };

  handleContainerRef = (ref) => (this.container = ref);

  update = () => {
    requestAnimationFrame(this.update);
    this.renderScene();
  }

  renderScene = () => this.renderer.render(this.scene, this.camera);

  render = () => <div ref={this.handleContainerRef} />;
}
