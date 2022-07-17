import { MoveControllerInterface } from '~/core/player/controllers/MoveController'
import Game from '~/scenes/Game'
import { MobConfig } from '~/utils/configs/mobs'
import { Direction } from '~/utils/Constants'
import { Mob } from '../Mob'

export interface MobMoveControllerConfig {
  game: Game
  config: MobConfig
  mob: Mob
}

export class MobMoveController implements MoveControllerInterface {
  private config: MobConfig
  private game: Game
  private mob: Mob
  public currDirection: Direction = Direction.DOWN
  constructor(config: MobMoveControllerConfig) {
    this.config = config.config
    this.game = config.game
    this.mob = config.mob
  }

  detectMovement(): boolean {
    const sprites: Phaser.Physics.Arcade.Sprite[] = this.mob.getSprites()
    for (let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i]
      if (sprite.body.velocity.x > 0 || sprite.body.velocity.y > 0) {
        return true
      }
    }
    return false
  }

  stop(): void {
    const sprites = this.mob.getSprites()
    sprites.forEach((sprite) => {
      sprite.setVelocity(0)
    })
  }

  handleMovement(): void {
    const sprites = this.mob.getSprites()
    switch (this.currDirection) {
      case Direction.LEFT: {
        sprites.forEach((sprite) => {
          sprite.setVelocityY(0)
          sprite.setVelocityX(-this.config.speed)
          sprite.setFlipX(true)
        })
        break
      }
      case Direction.RIGHT: {
        sprites.forEach((sprite) => {
          sprite.setVelocityY(0)
          sprite.setVelocityX(this.config.speed)
          sprite.setFlipX(false)
        })
        break
      }
      case Direction.UP: {
        sprites.forEach((sprite) => {
          sprite.setVelocityX(0)
          sprite.setVelocityY(-this.config.speed)
          sprite.setFlipX(false)
        })
        break
      }
      case Direction.DOWN: {
        sprites.forEach((sprite) => {
          sprite.setVelocityX(0)
          sprite.setVelocityY(this.config.speed)
          sprite.setFlipX(false)
        })
        break
      }
    }
  }
}
