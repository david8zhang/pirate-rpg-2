import Game from '~/scenes/Game'
import { ItemConfig } from '~/utils/configs/items'

export class Item {
  public name: string
  public sprite: Phaser.Physics.Arcade.Sprite
  private game: Game
  private dropLength: number

  constructor(game: Game, itemConfig: ItemConfig) {
    this.game = game
    this.name = itemConfig.name
    this.dropLength = itemConfig.dropLength
    this.sprite = this.game.physics.add
      .sprite(itemConfig.position.x, itemConfig.position.y, itemConfig.texture)
      .setScale(itemConfig.scale)
    this.sprite.setData('ref', this)
  }

  onPlayerHoverItem() {
    const playerPosition = this.game.player.position
    const playerDisplaySize = this.game.player.displaySize
    this.game.hoverText.showText(
      `(E) Pick up ${this.name}`,
      playerPosition.x - playerDisplaySize.width,
      playerPosition.y + 20
    )
    this.game.player.itemOnHover = this
  }

  drop(launchVelocity?: number) {
    // Launch coconut in random direction
    this.sprite.setName('InAir') // InAir tells depth sorting logic to ignore this sprite
    this.sprite.setGravityY(500)
    this.sprite.setDepth(10000)
    const randLaunchAngle = Math.random() * -60 + -60
    this.game.physics.velocityFromAngle(
      randLaunchAngle,
      launchVelocity || 150,
      this.sprite.body.velocity
    )

    // After some time, stop the gravity and velocity to simulate it hitting the ground
    this.game.time.delayedCall(this.dropLength || 650, () => {
      this.sprite.setGravity(0)
      this.sprite.setVelocity(0)

      // Do it agian for a "bounce" effect
      this.game.physics.velocityFromAngle(-100, 75, this.sprite.body.velocity)
      this.sprite.setGravityY(500)
      this.game.time.delayedCall(200, () => {
        this.sprite.setGravity(0)
        this.sprite.setVelocity(0)
        this.sprite.setName('')
      })
    })
  }

  destroy() {
    this.sprite.destroy()
  }
}
