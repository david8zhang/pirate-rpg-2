import Game from '~/scenes/Game'
import { Player, PlayerConfig } from './Player'

export interface ColliderControllerConfig {
  player: Player
  game: Game
  playerConfig: PlayerConfig
  colliderConfig: {
    width: number
    height: number
  }
}

export class ColliderController {
  private player: Player
  private game: Game

  constructor(config: ColliderControllerConfig) {
    const { player, game, colliderConfig, playerConfig } = config
    this.player = player
    this.game = game
    this.setupLayerColliders(playerConfig)
    this.configureBodySize()
  }

  setupLayerColliders(playerConfig: PlayerConfig) {
    const { layersToCollideWith } = playerConfig
    if (layersToCollideWith) {
      layersToCollideWith.forEach((layer: string) => {
        const layerToCollideWith = this.game.map.getLayer(layer)
        const sprites = this.player.getSprites()
        if (sprites) {
          sprites.forEach((sprite) => {
            this.game.physics.add.collider(layerToCollideWith, sprite)
          })
        }
      })
    }
  }

  configureBodySize() {
    const sprites = this.player.getSprites()
    sprites.forEach((sprite) => {
      sprite.body.setSize(10, 10)
      sprite.body.offset.y += 12
    })
  }
}
