import Game from '~/scenes/Game'
import { Direction } from './MoveController'
import { Player, PlayerConfig } from './Player'

export interface AnimationControllerConfig {
  playerConfig: PlayerConfig
  game: Game
  player: Player
}

export class AnimationController {
  private game: Game
  private player: Player

  // Mapping of each character piece to a sprite animation key
  public spriteMapping: any = {}

  constructor(config: AnimationControllerConfig) {
    const { playerConfig, game, player } = config
    this.game = game
    this.player = player
    this.setupSprites(playerConfig)
  }

  setupSprites(config: PlayerConfig) {
    // Sprites
    const spriteKeyMapping = this.player.getSpriteMapping()
    Object.keys(spriteKeyMapping).forEach((key, index) => {
      const spriteKey = spriteKeyMapping[key]
      const sprite = this.addSprite(config, spriteKey, index + 1)
      if (!spriteKey) {
        sprite.setVisible(false)
      }
      this.spriteMapping[key] = sprite
    })
    const baseKey = this.player.getBaseKey()
    this.game.cameras.main.startFollow(this.spriteMapping[baseKey])
  }

  addSprite(config: PlayerConfig, spriteKey: string, depth: number): Phaser.Physics.Arcade.Sprite {
    const sprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, spriteKey)
      .setScale(config.scale.x, config.scale.y)
      .setDepth(depth)
    this.game.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    return sprite
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

  getSpriteByName(name: string) {
    return this.sprites.find((sprite) => sprite.texture.key === name)
  }

  get sprites() {
    return Object.keys(this.spriteMapping).map((key) => this.spriteMapping[key])
  }

  setSpriteTextureForKey(key: string, texture: string) {
    if (!texture) {
      this.spriteMapping[key].setVisible(false)
    } else {
      this.spriteMapping[key].setVisible(true)
    }
    this.spriteMapping[key].setTexture(texture)
  }
}
