import Game from '~/scenes/Game'
import { Direction } from './MoveController'
import { Player, PlayerConfig } from '../Player'

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
  public attackHitbox: Phaser.Physics.Arcade.Sprite

  constructor(config: ColliderControllerConfig) {
    const { player, game, colliderConfig, playerConfig } = config
    this.player = player
    this.game = game
    this.attackHitbox = this.game.physics.add
      .sprite(this.player.position.x, this.player.position.y, '')
      .setVisible(false)
      .setDebug(false, false, 0x00ff00)

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

  deactivateAttackHitbox() {
    this.attackHitbox.setDebug(false, false, 0x00ff00)
    this.attackHitbox.body.enable = false
    this.attackHitbox.setPosition(this.player.position.x, this.player.position.y)
  }

  activateAttackHitbox(direction: Direction) {
    this.attackHitbox.setDebug(true, false, 0x00ff00)
    this.attackHitbox.body.enable = true
    const playerPosition = this.player.position
    const playerDisplaySize = this.player.displaySize
    switch (direction) {
      case Direction.LEFT: {
        this.attackHitbox.setPosition(
          playerPosition.x - playerDisplaySize.width / 2,
          playerPosition.y + 20
        )
        break
      }
      case Direction.RIGHT: {
        this.attackHitbox.setPosition(
          playerPosition.x + playerDisplaySize.width / 2,
          playerPosition.y + 20
        )
        break
      }
      case Direction.UP: {
        this.attackHitbox.setPosition(
          playerPosition.x,
          playerPosition.y - playerDisplaySize.height / 2 + 10
        )
        break
      }
      case Direction.DOWN: {
        this.attackHitbox.setPosition(
          playerPosition.x,
          playerPosition.y + playerDisplaySize.height / 2 + 20
        )
        break
      }
    }
  }
}
