import Game from '~/scenes/Game'
import { Player } from '../Player'
import { Direction, EntityConfig } from '~/utils/Constants'

export interface ColliderControllerConfig {
  player: Player
  game: Game
  playerConfig: EntityConfig
}

export interface ColliderControllerInterface {
  setupLayerColliders(config: EntityConfig): void
  configureBodySize(body: {
    width: number
    height: number
    offsetX?: number
    offsetY?: number
  }): void
}

export class ColliderController {
  private player: Player
  private game: Game
  public attackHitbox: Phaser.Physics.Arcade.Sprite
  public attackGroup: Phaser.Physics.Arcade.Group

  constructor(config: ColliderControllerConfig) {
    const { player, game, playerConfig } = config
    this.player = player
    this.game = game
    this.attackGroup = this.game.physics.add.group()
    this.attackHitbox = this.game.physics.add
      .sprite(this.player.position.x, this.player.position.y, '')
      .setVisible(false)
      .setDebug(false, false, 0x00ff00)
    this.attackGroup.add(this.attackHitbox)

    this.setupLayerColliders(playerConfig)
    this.configureBodySize(playerConfig.body)
  }

  addObjectToAttackHitboxGroup(obj: Phaser.GameObjects.GameObject) {
    this.attackGroup.add(obj)
  }

  setupLayerColliders(playerConfig: EntityConfig) {
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

  configureBodySize(body: { width: number; height: number; offsetX?: number; offsetY?: number }) {
    const sprites = this.player.getSprites()
    sprites.forEach((sprite) => {
      sprite.body.setSize(body.width, body.height)
      if (body.offsetY) {
        sprite.body.offset.y += body.offsetY
      }
      if (body.offsetX) {
        sprite.body.offset.x += body.offsetX
      }
    })
  }

  deactivateAttackHitbox() {
    this.attackHitbox.setDebug(false, false, 0x00ff00)
    this.attackHitbox.setActive(false)
    this.attackHitbox.setPosition(this.player.position.x, this.player.position.y)
  }

  activateAttackHitbox(direction: Direction) {
    this.attackHitbox.setActive(true)
    this.attackHitbox.setDebug(true, false, 0x00ff00)
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
