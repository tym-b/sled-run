import Pizzicato from 'pizzicato';
import { zipObject, keys, map } from 'lodash';

import assets from './assets';


function loadSound(url) {
  return new Promise((resolve) => {
    const sound = new Pizzicato.Sound(url, () => resolve(sound));
  });
}

export default class Audio {
  async load() {
    this.sounds = zipObject(keys(assets), await Promise.all(map(assets, url => loadSound(url))));
    this.sounds.background.loop = true;
  }
}
