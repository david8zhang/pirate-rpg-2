import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'

export class Map {
  private game: Game
  public tileMap!: Phaser.Tilemaps.Tilemap
  private layerMappings: {
    [layerName: string]: Phaser.Tilemaps.TilemapLayer
  } = {}

  constructor(game: Game, tilemapKey: string) {
    this.game = game
    this.initTilemap(tilemapKey)
  }

  initTilemap(tilemapKey: string) {
    this.tileMap = this.game.make.tilemap({
      key: tilemapKey,
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

  public getLayer(name: string) {
    return this.layerMappings[name]
  }
}
