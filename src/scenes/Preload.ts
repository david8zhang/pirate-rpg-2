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

    // Characters
    this.load.image('player', 'character/player.png')
    this.load.image('npc', 'character/npc.png')

    // Tile maps
    this.load.tilemapTiledJSON('map1', 'tiles/map1.json')
    this.load.image('beach-tiles', 'tiles/beach-tiles.png')
  }

  create() {
    this.scene.start('ui')
    this.scene.start('game')
  }
}
