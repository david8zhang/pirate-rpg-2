import Game from '~/scenes/Game'
import { PLAYER_CONFIG } from '~/utils/configs/player'
import { Constants, Direction } from '~/utils/Constants'
import { Player } from '../Player'

export interface MoveControllerConfig {
  player: Player
  game: Game
}

export interface MoveControllerInterface {
  detectMovement(): boolean
  stop(): void
  handleMovement(): void
}

export class MoveController implements MoveControllerInterface {
  private game: Game
  private player: Player

  // WASD movement
  private keyW!: Phaser.Input.Keyboard.Key
  private keyA!: Phaser.Input.Keyboard.Key
  private keyS!: Phaser.Input.Keyboard.Key
  private keyD!: Phaser.Input.Keyboard.Key

  // Direction that the player is currently facing
  public currDirection: Direction = Direction.DOWN

  constructor(config: MoveControllerConfig) {
    const { game, player } = config
    this.game = game
    this.player = player
    this.setupKeyboardKeys()
  }

  setupKeyboardKeys() {
    this.keyW = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyA = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyS = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyD = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  detectMovement() {
    const leftDown = this.keyA.isDown
    const rightDown = this.keyD.isDown
    const upDown = this.keyW.isDown
    const downDown = this.keyS.isDown
    return leftDown || rightDown || upDown || downDown
  }

  stop() {
    const sprites = this.player.getSprites()
    sprites.forEach((sprite) => {
      sprite.setVelocity(0)
    })
  }

  handleMovement() {
    if (!this.keyA || !this.keyD || !this.keyW || !this.keyS) {
      return
    }

    const leftDown = this.keyA.isDown
    const rightDown = this.keyD.isDown
    const upDown = this.keyW.isDown
    const downDown = this.keyS.isDown

    const speed = PLAYER_CONFIG.speed
    const sprites = this.player.getSprites()

    if (leftDown || rightDown) {
      let velocityX = leftDown ? -speed : speed
      this.currDirection = leftDown ? Direction.LEFT : Direction.RIGHT
      if (leftDown && rightDown) {
        velocityX = 0
      }
      sprites.forEach((sprite) => {
        sprite.setVelocityX(velocityX)
        sprite.setFlipX(leftDown)
      })
    } else {
      sprites.forEach((sprite) => {
        sprite.setVelocityX(0)
      })
    }
    if (upDown || downDown) {
      let velocityY = upDown ? -speed : speed
      this.currDirection = upDown ? Direction.UP : Direction.DOWN
      if (upDown && downDown) {
        velocityY = 0
      }
      sprites.forEach((sprite) => {
        sprite.setFlipX(false)
        sprite.setVelocityY(velocityY)
      })
    } else {
      sprites.forEach((sprite) => {
        sprite.setVelocityY(0)
      })
    }
  }
}
