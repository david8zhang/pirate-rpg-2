import Phaser from 'phaser'
import { Player } from '../core/player/Player'
import { Map } from '~/core/map/Map'
import { Constants, EntityConfig } from '~/utils/Constants'
import { createPlayerArmsAnims, createPlayerBaseAnims } from '~/anims/PlayerAnims'
import { createEquipmentAnims } from '~/anims/EquipmentAnims'
import { ArmorType } from '~/core/player/managers/EquipmentManager'
import { NPC } from '~/core/npc/NPC'
import { Harvestable } from '~/core/object/Harvestable'
import { HoverText } from '~/core/ui/HoverText'
import { Item } from '~/core/object/Item'
import { PLAYER_CONFIG } from '~/utils/configs/player'
import { createMobAnims } from '~/anims/MobAnims'
import { Mob } from '~/core/mob/Mob'
import { CRAB_CONFIG } from '~/utils/configs/mobs'
import { HARVESTABLE_CONFIGS } from '~/utils/configs/harvestables'

export default class Game extends Phaser.Scene {
  public player!: Player
  public map!: Map
  public animatedTiles: any

  // Map stuff
  public npcGroup!: Phaser.GameObjects.Group
  public harvestableGroup!: Phaser.GameObjects.Group
  public itemsGroup!: Phaser.GameObjects.Group
  public mobGroup!: Phaser.GameObjects.Group

  // Collider game object groups
  public isHarvestableCollided: boolean = false
  public isMobCollided: boolean = false
  public ignoreDepthSortingNames = ['InAir', 'UI', 'Weapon', 'Structure', 'Transport', 'Effect']

  // UI elements
  public hoverText!: HoverText

  // Functions to be run on every update
  public updateHooks: Function[] = []

  constructor() {
    super('game')
  }

  preload() {
    this.load.scenePlugin(
      'AnimatedTiles',
      'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
      'animatedTiles',
      'animatedTiles'
    )
    this.hoverText = new HoverText(this, 0, 0)
  }

  create() {
    createPlayerBaseAnims(this.anims)
    createPlayerArmsAnims(this.anims)
    createEquipmentAnims(this.anims)
    createMobAnims(this.anims)
    this.configureCamera()
    this.initTilemap()
    this.initPlayer()
    this.initHarvestables()
    this.initItems()
    this.initMobs()
    this.initColliders()
  }

  configureCamera() {
    this.cameras.main.setBounds(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
  }

  initItems() {
    this.itemsGroup = this.physics.add.group({ classType: Item })
    const basePlayerSprite = this.player.getBaseSprite()
    this.updateHooks.push(() => {
      if (!basePlayerSprite.body.embedded) {
        this.hoverText.hide()
        this.player.itemOnHover = null
      }
    })
    this.physics.add.overlap(basePlayerSprite, this.itemsGroup, (obj1, obj2) => {
      const item = obj2.getData('ref') as Item
      item.onPlayerHoverItem()
    })
  }

  addItem(item: Item) {
    this.itemsGroup.add(item.sprite)
  }

  removeItem(item: Item) {
    item.destroy()
  }

  initTilemap() {
    this.map = new Map(this, 'intro-island')
  }

  initPlayer() {
    if (this.map) {
      const spawnLayer = this.map.tileMap.getObjectLayer('Spawn')
      const spawnPoint = spawnLayer.objects.find((object) => object.name === 'spawn-point')
      if (spawnPoint) {
        const config: EntityConfig = {
          ...PLAYER_CONFIG,
          position: {
            x: spawnPoint.x as number,
            y: spawnPoint.y as number,
          },
        }
        this.player = new Player(this, config)
        this.cameras.main.startFollow(this.player.getBaseSprite())

        // Add equipment
        this.player.addEquipment(ArmorType.HEAD, { animKey: 'red-bandana' })
        this.player.addEquipment(ArmorType.LEGS, { animKey: 'leather-pants' })
        this.player.addEquipment(ArmorType.CHEST, { animKey: 'leather-vest' })
      }
    }
  }

  initNPCs() {
    this.npcGroup = this.add.group()
    const npcLayer = this.map.tileMap.getObjectLayer('NPC')
    if (npcLayer && Constants.GAME_CONFIG.npcConfig) {
      npcLayer.objects.forEach((layerConfig) => {
        const npcConfig = Constants.GAME_CONFIG.npcConfig![layerConfig.name]
        const npc = new NPC(this, {
          position: {
            x: (layerConfig.x as number) * Constants.LAYER_SCALE,
            y: (layerConfig.y as number) * Constants.LAYER_SCALE,
          },
          scale: {
            x: 0.3,
            y: 0.3,
          },
          texture: npcConfig.texture,
          dialog: npcConfig.dialog,
        })
        this.npcGroup.add(npc.sprite)
      })
    }
  }

  initHarvestables() {
    this.harvestableGroup = this.add.group()
    if (Constants.GAME_CONFIG.harvestableConfig) {
      const allHarvestables = Constants.GAME_CONFIG.harvestableConfig
      allHarvestables.forEach((config) => {
        const harvestableConfig = HARVESTABLE_CONFIGS[config.harvestableType]
        const harvestable = new Harvestable(this, {
          ...harvestableConfig,
          position: config.position,
        })
        this.harvestableGroup.add(harvestable.sprite)
      })
    }
  }

  initMobs() {
    this.mobGroup = this.add.group()
    const basePlayerSprite = this.player.getBaseSprite()
    const crab = new Mob(this, {
      ...CRAB_CONFIG,
      position: {
        x: basePlayerSprite.x,
        y: basePlayerSprite.y + 100,
      },
    })
    this.mobGroup.add(crab.getBaseSprite())
    this.updateHooks.push(() => {
      crab.update()
    })
  }

  initColliders() {
    // Harvestable colliders
    this.physics.add.collider(this.player.attackHitbox, this.harvestableGroup, (obj1, obj2) => {
      if (!this.isHarvestableCollided) {
        this.isHarvestableCollided = true
        this.cameras.main.shake(125, 0.002)
        const harvestable = obj2.getData('ref') as Harvestable
        harvestable.takeDamage()
      }
    })
    this.physics.add.collider(this.player.attackHitbox, this.mobGroup, (obj1, obj2) => {
      if (!this.isMobCollided) {
        this.isMobCollided = true
        this.cameras.main.shake(125, 0.002)
        const mob = obj2.getData('ref') as Mob
      }
    })
  }

  update() {
    this.player.update()
    this.depthSort()
    this.updateHooks.forEach((fn) => {
      fn()
    })
  }

  depthSort() {
    const sortedByY = this.sys.displayList
      .getChildren()
      .filter((child: any) => {
        return child.y && !this.ignoreDepthSortingNames.includes(child.name)
      })
      .sort((a: any, b: any) => {
        return a.y - b.y
      })
    let lowestLayer = 1
    sortedByY.forEach((c: any, index: number) => {
      if (c.setDepth) {
        c.setDepth(lowestLayer + index)
      }
    })
  }
}
