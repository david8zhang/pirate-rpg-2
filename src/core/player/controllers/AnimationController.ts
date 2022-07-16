import { Direction } from '~/utils/Constants'

export interface AnimationControllerConfig {
  sprites: Phaser.Physics.Arcade.Sprite[]
}

export class AnimationController {
  private sprites: Phaser.Physics.Arcade.Sprite[]
  constructor(config: AnimationControllerConfig) {
    this.sprites = config.sprites
  }

  private getAnimationDirection(direction: Direction) {
    switch (direction) {
      case Direction.LEFT:
      case Direction.RIGHT: {
        return 'side'
      }
      case Direction.UP: {
        return 'back'
      }
      case Direction.DOWN: {
        return 'front'
      }
    }
  }

  playAttackAnimation(direction: Direction, isArmed: boolean, onCompletedFn: Function) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      if (sprite.visible) {
        if (!isArmed) {
          sprite.anims.play(`${sprite.texture.key}-punch-${animDirection}`)
        } else {
          sprite.anims.play(`${sprite.texture.key}-swipe-${animDirection}`)
        }
      }
    })
    this.sprites[0].once('animationcomplete', () => {
      onCompletedFn()
    })
  }

  playDeathAnimation(direction: Direction, onCompletedFn?: Function) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      if (sprite.visible) {
        sprite.anims.play(`${sprite.texture.key}-die-${animDirection}`)
      }
    })
    this.sprites[0].once('animationcomplete', () => {
      if (onCompletedFn) {
        onCompletedFn()
      }
    })
  }

  playHurtAnimation(direction: Direction, onCompletedFn?: Function) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      sprite.anims.play(`${sprite.texture.key}-hurt-${animDirection}`)
    })
    this.sprites[0].once('animationcomplete', () => {
      if (onCompletedFn) {
        onCompletedFn()
      }
    })
  }

  playMoveAnimation(direction: Direction) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      if (sprite.visible) {
        sprite.anims.play(`${sprite.texture.key}-walk-${animDirection}`, true)
      }
    })
  }

  playIdleAnimation(direction: Direction) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      if (sprite.visible) {
        sprite.anims.play(`${sprite.texture.key}-idle-${animDirection}`, true)
      }
    })
  }
}
