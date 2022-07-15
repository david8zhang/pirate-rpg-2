import { Scene } from 'phaser'

export default class Preload extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.loadUIImages()
    this.loadIcons()
    this.loadTilemaps()
    this.loadCharacter()
    this.loadEquipment()
    this.loadHarvestables()
    this.loadMobs()
    this.loadWeapons()
  }

  loadUIImages() {
    this.load.image('panel', 'ui/grey_panel.png')
  }

  loadIcons() {
    this.load.image(
      'nextPage',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png'
    )
  }

  loadTilemaps() {
    this.load.tilemapTiledJSON('intro-island', 'tiles/intro-island.json')
    this.load.image('pirate-rpg-tiles', 'tiles/pirate-rpg-tiles.png')
  }

  loadCharacter() {
    this.load.atlas('player-base', 'character/base.png', 'character/base.json')
    this.load.atlas('player-arms', 'character/base-arms.png', 'character/base-arms.json')
  }

  loadEquipment() {
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
  }

  loadHarvestables() {
    this.load.image(
      'palm-tree_without_coconut',
      'harvestables/palm-tree/palm-tree_without_coconut.png'
    )
    this.load.image('palm-tree_with_coconut', 'harvestables/palm-tree/palm-tree_with_coconut.png')
    this.load.image('coconut', 'items/coconut.png')
  }

  loadMobs() {
    this.load.atlas('crab', 'mobs/crab/crab.png', 'mobs/crab/crab.json')
  }

  loadWeapons() {
    this.load.image('stone-axe-diag', 'equipment/weapons/stone-axe/axe-diag.png')
    this.load.image('stone-axe', 'equipment/weapons/stone-axe/axe.png')
    this.load.image('slash-1', 'equipment/weapons/effects/slash-1.png')
    this.load.image('slash-2', 'equipment/weapons/effects/slash-2.png')
  }

  create() {
    this.scene.start('ui')
    this.scene.start('game')
  }
}
