import { Scene } from 'phaser'

export default class Preload extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('player', 'player.png')
  }

  create() {
    this.scene.start('game')
  }
}
