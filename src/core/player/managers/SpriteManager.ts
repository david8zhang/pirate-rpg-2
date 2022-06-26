import Game from '~/scenes/Game'
import { ArmorType } from './EquipmentManager'
import { Player, PlayerConfig } from '../Player'

export interface SpriteManagerConfig {
  player: Player
  game: Game
  playerConfig: PlayerConfig
}

export class SpriteManager {
  private player: Player
  private game: Game
  // Mapping of each character piece to a sprite animation key
  public spriteMapping: any = {}

  constructor(config: SpriteManagerConfig) {
    this.player = config.player
    this.game = config.game
    this.setupSprites(config.playerConfig)
  }

  setupSprites(config: PlayerConfig) {
    const spriteKeyMapping = this.getSpriteMapping()
    Object.keys(spriteKeyMapping).forEach((key, index) => {
      const spriteKey = spriteKeyMapping[key]
      const sprite = this.addSprite(config, spriteKey, index + 1)
      if (!spriteKey) {
        sprite.setVisible(false)
      }
      this.spriteMapping[key] = sprite
    })
    this.game.cameras.main.startFollow(this.spriteMapping[ArmorType.BASE])
  }

  addSprite(config: PlayerConfig, spriteKey: string, depth: number): Phaser.Physics.Arcade.Sprite {
    const sprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, spriteKey)
      .setScale(config.scale.x, config.scale.y)
      .setDepth(depth)
    this.game.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    return sprite
  }

  getSpriteMapping() {
    return {
      [ArmorType.BASE]: 'player-base',
      [ArmorType.ARMS]: 'player-arms',
      [ArmorType.LEGS]: '',
      [ArmorType.HEAD]: '',
      [ArmorType.CHEST]: '',
    }
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
