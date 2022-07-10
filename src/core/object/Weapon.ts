import Game from '~/scenes/Game'
import { Player } from '../player/Player'

export interface WeaponConfig {
  game: Game
  player: Player
  textureSet: {
    up: string
    down: string
    left: string
    right: string
  }
  damage: number
  attackRange: number
  name: string
}

export class Weapon {
  private game: Game
  private player: Player
  private sprite: Phaser.GameObjects.Sprite
  private attackEffectSprite: Phaser.GameObjects.Sprite
  constructor(config: WeaponConfig) {
    const { game, player } = config
    this.game = game
    this.player = player

    const baseSprite = this.player.getBaseSprite()
    this.sprite = this.game.add.sprite(baseSprite.x, baseSprite.y, '')
    this.attackEffectSprite = this.game.add.sprite(baseSprite.x, baseSprite.y, '')
  }
}
