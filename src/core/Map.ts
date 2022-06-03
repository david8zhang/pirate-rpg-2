import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'

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

    this.tileMap = this.game.make.tilemap({
      key: mapConfig.tileMapKey,
    })
    const tileset = this.tileMap.addTilesetImage('beach-tiles', 'beach-tiles')
    const oceanLayer = this.tileMap.createLayer('Ocean', tileset).setScale(Constants.LAYER_SCALE)
    const sandLayer = this.tileMap.createLayer('Sand', tileset).setScale(Constants.LAYER_SCALE)
  }
}
