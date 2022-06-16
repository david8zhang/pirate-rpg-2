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
  public tileMap!: Phaser.Tilemaps.Tilemap
  private layerMappings: {
    [layerName: string]: Phaser.Tilemaps.TilemapLayer
  } = {}
  public npcs: NPC[] = []

  constructor(game: Game, mapConfig: MapConfig) {
    this.game = game
    this.initTilemap(mapConfig)
    this.initNPCs(mapConfig)
  }

  initTilemap(mapConfig: MapConfig) {
    this.tileMap = this.game.make.tilemap({
      key: mapConfig.tileMapKey,
    })
    const tileset = this.tileMap.addTilesetImage('pirate-rpg-tiles', 'pirate-rpg-tiles')
    this.createLayer('Ocean', tileset)
    this.createLayer('Sand', tileset)
    this.createLayer('Grass', tileset)
    this.game.animatedTiles.init(this.tileMap)
  }

  createLayer(layerName: string, tileset) {
    const layer = this.tileMap.createLayer(layerName, tileset).setScale(Constants.LAYER_SCALE)
    layer.setCollisionByExclusion([-1])
    this.layerMappings[layerName] = layer
  }

  initNPCs(mapConfig: MapConfig) {
    const npcLayer = this.tileMap.getObjectLayer('NPC')
    if (npcLayer) {
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
        this.npcs.push(npc)
      })
    }
  }

  public getLayer(name: string) {
    return this.layerMappings[name]
  }
}
