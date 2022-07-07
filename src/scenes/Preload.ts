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

    // Main character animations
    this.load.atlas('player-base', 'character/base.png', 'character/base.json')
    this.load.atlas('player-arms', 'character/base-arms.png', 'character/base-arms.json')

    // Equipment
    this.load.atlas(
      'leather-vest',
      'equipment/chest/leather-vest/leather-vest.png',
      'equipment/chest/leather-vest/leather-vest.json'
    )
    this.load.atlas(
      'leather-pants',
      'equipment/legs/leather-pants/leather-pants.png',
      'equipment/legs/leather-pants/leather-pants.json'
    )
    this.load.atlas(
      'red-bandana',
      'equipment/head/red-bandana/red-bandana.png',
      'equipment/head/red-bandana/red-bandana.json'
    )

    // Harvestables
    this.load.image(
      'palm-tree_without_coconut',
      'harvestables/palm-tree/palm-tree_without_coconut.png'
    )
    this.load.image('palm-tree_with_coconut', 'harvestables/palm-tree/palm-tree_with_coconut.png')
    this.load.image('coconut', 'items/coconut.png')
  }

  create() {
    this.scene.start('ui')
    this.scene.start('game')
  }
}
