import React, { PureComponent } from 'react';
import * as THREE from 'three';
import { clamp } from 'ramda';
import TWEEN from '@tweenjs/tween.js';
import socketio from 'socket.io-client';

const clampMoveValue = clamp(-100, 100);

export default class SceneComponent extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.socket.on('move', this.handleMove);

    this.createScene();

    requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  socket = socketio(`${window.location.hostname}:8181`);

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

  configureHero = () => {
    const heroGeometry = new THREE.BoxGeometry(3, 1, 1);
    const heroMaterial = new THREE.MeshStandardMaterial({ color: 'grey' });

    this.hero = new THREE.Mesh(heroGeometry, heroMaterial);
    this.hero.castShadow = true;
    this.hero.receiveShadow = false;
    this.hero.position.y = 2;

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

  handleMove = ({ position }) => {
    this.hero.rotation.z = -position / 180 * Math.PI;
  };

  handleResize = () => {
    this.sceneWidth = window.innerWidth;
    this.sceneHeight = window.innerHeight;
    this.renderer.setSize(this.sceneWidth, this.sceneHeight);
  };

  handleContainerRef = (ref) => (this.container = ref);

  loop = (time) => {
    requestAnimationFrame(this.loop);
    this.renderScene();
    TWEEN.update(time);
  }

  renderScene = () => this.renderer.render(this.scene, this.camera);

  render = () => <div ref={this.handleContainerRef} />;
}
