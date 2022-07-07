import Phaser from 'phaser'
import { Player } from '../core/player/Player'
import { Map } from '~/core/map/Map'
import { Constants } from '~/utils/Constants'
import { createPlayerArmsAnims, createPlayerBaseAnims } from '~/anims/PlayerAnims'
import { createEquipmentAnims } from '~/anims/EquipmentAnims'
import { ArmorType } from '~/core/player/managers/EquipmentManager'
import { NPC } from '~/core/npc/NPC'
import { Harvestable, HARVESTABLE_CONFIGS } from '~/core/Harvestable'

export default class Game extends Phaser.Scene {
  public player!: Player
  public map!: Map
  public animatedTiles: any

  // Map stuff
  public npcGroup!: Phaser.GameObjects.Group
  public harvestableGroup!: Phaser.GameObjects.Group

  // Collider game object groups
  public isHarvestableCollided: boolean = false
  public ignoreDepthSortingNames = ['InAir', 'UI', 'Weapon', 'Structure', 'Transport', 'Effect']

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
  }

  create() {
    createPlayerBaseAnims(this.anims)
    createPlayerArmsAnims(this.anims)
    createEquipmentAnims(this.anims)
    this.initTilemap()
    this.initPlayer()
    this.initHarvestables()
    this.cameras.main.setBounds(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
    this.initColliders()
  }

  initTilemap() {
    this.map = new Map(this, 'intro-island')
  }

  initPlayer() {
    if (this.map) {
      const spawnLayer = this.map.tileMap.getObjectLayer('Spawn')
      const spawnPoint = spawnLayer.objects.find((object) => object.name === 'spawn-point')
      if (spawnPoint) {
        this.player = new Player(this, {
          position: {
            x: spawnPoint.x as number,
            y: spawnPoint.y as number,
          },
          scale: { x: 2, y: 2 },
          body: {
            x: 0.2,
            y: 0.2,
          },
          layersToCollideWith: ['Ocean'],
        })

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
          textures: harvestableConfig.textures,
          position: config.position,
          hitbox: harvestableConfig.hitbox,
          scale: harvestableConfig.scale,
          dropItems: harvestableConfig.droppedItems,
        })
        this.harvestableGroup.add(harvestable.sprite)
      })
    }
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
  }

  update() {
    this.player.update()
    this.depthSort()
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
