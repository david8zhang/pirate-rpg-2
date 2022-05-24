import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'

export class MoveController {
  private sprite: Phaser.Physics.Arcade.Sprite
  private game: Game

  // WASD movement
  private keyW!: Phaser.Input.Keyboard.Key
  private keyA!: Phaser.Input.Keyboard.Key
  private keyS!: Phaser.Input.Keyboard.Key
  private keyD!: Phaser.Input.Keyboard.Key

  constructor(sprite: Phaser.Physics.Arcade.Sprite, game: Game) {
    this.sprite = sprite
    this.game = game
    this.setupKeyboardKeys()
  }

  setupKeyboardKeys() {
    this.keyW = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyA = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyS = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyD = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
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
      if (leftDown && rightDown) {
        velocityX = 0
      }
      this.sprite.setVelocityX(velocityX)
    } else {
      this.sprite.setVelocityX(0)
    }
    if (upDown || downDown) {
      let velocityY = upDown ? -speed : speed
      if (upDown && downDown) {
        velocityY = 0
      }
      this.sprite.setVelocityY(velocityY)
    } else {
      this.sprite.setVelocityY(0)
    }
  }

  update() {
    this.handlePlayerMovement()
  }
}
