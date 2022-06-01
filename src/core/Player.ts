import Game from '~/scenes/Game'
import { MoveController } from './MoveController'

export interface PlayerConfig {
  position: {
    x: number
    y: number
  }
  scale: {
    x: number
    y: number
  }
}

export class Player {
  public sprite: Phaser.Physics.Arcade.Sprite
  private game: Game
  private updateList: any[] = []

  constructor(game: Game, config: PlayerConfig) {
    this.game = game
    this.sprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, 'player')
      .setScale(config.scale.x, config.scale.y)

    const moveController = new MoveController(this.sprite, this.game)
    this.updateList.push(moveController)
  }

  update() {
    this.updateList.forEach((component) => {
      component.update()
    })
  }
}
