import Game from '~/scenes/Game'
import { EntityConfig } from '~/utils/Constants'

export interface SpriteManagerConfig {
  game: Game
  config: EntityConfig
}

export class SpriteManager {
  private game: Game
  // Mapping of each character piece to a sprite animation key
  public spriteMapping: any = {}

  constructor(config: SpriteManagerConfig) {
    this.game = config.game
    this.setupSprites(config.config)
  }

  setupSprites(config: EntityConfig) {
    const spriteKeyMapping = config.spriteMapping
    Object.keys(spriteKeyMapping).forEach((key, index) => {
      const spriteKey = spriteKeyMapping[key]
      const sprite = this.addSprite(config, spriteKey, index + 1)
      if (!spriteKey) {
        sprite.setVisible(false)
      }
      this.spriteMapping[key] = sprite
    })
  }

  addSprite(config: EntityConfig, spriteKey: string, depth: number): Phaser.Physics.Arcade.Sprite {
    const sprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, spriteKey)
      .setScale(config.scale.x, config.scale.y)
      .setDepth(depth)
    this.game.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    return sprite
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
