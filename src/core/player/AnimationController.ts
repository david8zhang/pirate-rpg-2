import Game from '~/scenes/Game'
import { Direction } from './MoveController'
import { PlayerConfig } from './Player'

export class AnimationController {
  private game: Game
  public sprites: Phaser.Physics.Arcade.Sprite[] = []

  constructor(config: PlayerConfig, game: Game) {
    this.game = game
    this.setupSprites(config)
    if (config.layersToCollideWith) {
      this.setupTilemapCollision(config.layersToCollideWith)
    }
  }

  setupSprites(config: PlayerConfig) {
    // Sprites
    const keys = ['player-base', 'player-arms']
    keys.forEach((key, index) => {
      const sprite = this.addSprite(config, key, index + 1)
      this.sprites.push(sprite)
    })
    this.game.cameras.main.startFollow(this.sprites[0])
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
      if (!isArmed) {
        sprite.anims.play(`${sprite.texture.key}-punch-${animDirection}`)
      } else {
        sprite.anims.play(`${sprite.texture.key}-swipe-${animDirection}`)
      }
    })
    this.sprites[0].once('animationcomplete', () => {
      onCompletedFn()
    })
  }

  playMoveAnimation(direction: Direction) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      sprite.anims.play(`${sprite.texture.key}-walk-${animDirection}`, true)
    })
  }

  playIdleAnimation(direction: Direction) {
    const animDirection = this.getAnimationDirection(direction)
    this.sprites.forEach((sprite) => {
      sprite.anims.play(`${sprite.texture.key}-idle-${animDirection}`, true)
    })
  }

  getSpriteByName(name: string) {
    return this.sprites.find((sprite) => sprite.texture.key == name)
  }

  setupTilemapCollision(layersToCollideWith: string[]) {
    layersToCollideWith.forEach((layer: string) => {
      const layerToCollideWith = this.game.map.getLayer(layer)
      this.sprites.forEach((sprite) => {
        this.game.physics.add.collider(layerToCollideWith, sprite)
      })
    })
  }
}
