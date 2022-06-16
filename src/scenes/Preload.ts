import { Scene } from 'phaser'

export default class Preload extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    // random icons
    this.load.image(
      'nextPage',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png'
    )

    // Tilemaps
    this.load.tilemapTiledJSON('intro-island', 'tiles/intro-island.json')
    this.load.image('pirate-rpg-tiles', 'tiles/pirate-rpg-tiles.png')

    // Characters
    this.load.image('npc', 'character/npc.png')

    // Main character animations
    this.load.atlas(
      'player-base',
      'character/animations/base.png',
      'character/animations/base.json'
    )
    this.load.atlas(
      'player-arms',
      'character/animations/base-arms.png',
      'character/animations/base-arms.json'
    )
  }

  create() {
    this.scene.start('ui')
    this.scene.start('game')
  }
}
