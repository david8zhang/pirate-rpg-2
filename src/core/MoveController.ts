import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'

export enum Direction {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  UP = 'UP',
}

export class MoveController {
  private sprites: Phaser.Physics.Arcade.Sprite[]
  private game: Game

  // WASD movement
  private keyW!: Phaser.Input.Keyboard.Key
  private keyA!: Phaser.Input.Keyboard.Key
  private keyS!: Phaser.Input.Keyboard.Key
  private keyD!: Phaser.Input.Keyboard.Key

  // Direction that the player is currently facing
  public currDirection: Direction | null = null

  constructor(sprites: Phaser.Physics.Arcade.Sprite[], game: Game) {
    this.sprites = sprites
    this.game = game
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

  handlePlayerMovement() {
    if (!this.keyA || !this.keyD || !this.keyW || !this.keyS) {
      return
    }

    const leftDown = this.keyA.isDown
    const rightDown = this.keyD.isDown
    const upDown = this.keyW.isDown
    const downDown = this.keyS.isDown

    const speed = Constants.PLAYER_SPEED
    if (leftDown || rightDown) {
      let velocityX = leftDown ? -speed : speed
      this.currDirection = leftDown ? Direction.LEFT : Direction.RIGHT
      if (leftDown && rightDown) {
        velocityX = 0
      }
      this.sprites.forEach((sprite) => {
        sprite.setVelocityX(velocityX)
        sprite.setFlipX(leftDown)
      })
    } else {
      this.sprites.forEach((sprite) => {
        sprite.setVelocityX(0)
      })
    }
    if (upDown || downDown) {
      let velocityY = upDown ? -speed : speed
      this.currDirection = upDown ? Direction.UP : Direction.DOWN
      if (upDown && downDown) {
        velocityY = 0
      }
      this.sprites.forEach((sprite) => {
        sprite.setVelocityY(velocityY)
      })
    } else {
      this.sprites.forEach((sprite) => {
        sprite.setVelocityY(0)
      })
    }
  }

  update() {
    this.handlePlayerMovement()
  }
}
