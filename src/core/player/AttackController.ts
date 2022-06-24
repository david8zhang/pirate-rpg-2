import Game from '~/scenes/Game'
import { Player } from './Player'

export interface AttackControllerConfig {
  game: Game
  player: Player
}

export class AttackController {
  private game: Game
  private keySpace!: Phaser.Input.Keyboard.Key

  constructor(config: AttackControllerConfig) {
    const { game } = config
    this.game = game
    this.setupKeyboardKeys()
  }

  setupKeyboardKeys() {
    this.keySpace = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  detectAttack() {
    return this.keySpace && this.keySpace.isDown
  }
}
