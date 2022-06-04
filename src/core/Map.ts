import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'
import { NPC } from './NPC'

interface MapConfig {
  tileMapKey: string
  npcConfig: {
    [name: string]: {
      dialog: string
      texture: string
    }
  }
}

export class Map {
  private game: Game
  private tileMap!: Phaser.Tilemaps.Tilemap

  constructor(game: Game, mapConfig: MapConfig) {
    this.game = game
    this.initTilemap(mapConfig)
    this.initNPCs(mapConfig, this.tileMap)
  }

  initTilemap(mapConfig: MapConfig) {
    this.tileMap = this.game.make.tilemap({
      key: mapConfig.tileMapKey,
    })
    const tileset = this.tileMap.addTilesetImage('beach-tiles', 'beach-tiles')
    this.tileMap.createLayer('Ocean', tileset).setScale(Constants.LAYER_SCALE)
    this.tileMap.createLayer('Sand', tileset).setScale(Constants.LAYER_SCALE)
  }

  initNPCs(mapConfig: MapConfig, tileMap: Phaser.Tilemaps.Tilemap) {
    const npcLayer = this.tileMap.getObjectLayer('NPC')
    npcLayer.objects.forEach((layerConfig) => {
      const npcConfig = mapConfig.npcConfig[layerConfig.name]
      const npc = new NPC(this.game, {
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
    })
  }
}
