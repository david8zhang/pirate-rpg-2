import { Scene } from 'phaser'

export default class Preload extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('player', 'player.png')
    this.load.image(
      'nextPage',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png'
    )
    this.load.image('npc', 'npc.png')
  }

  create() {
    this.scene.start('game')
  }
}
