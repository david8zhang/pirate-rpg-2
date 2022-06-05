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
  layersToCollideWith?: string[]
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
      .setDepth(1)
    this.game.physics.world.enableBody(this.sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    const moveController = new MoveController(this.sprite, this.game)
    this.updateList.push(moveController)

    if (config.layersToCollideWith) {
      this.setupTilemapCollision(config.layersToCollideWith)
    }
  }

  setupTilemapCollision(layersToCollideWith: string[]) {
    layersToCollideWith.forEach((layer: string) => {
      const layerToCollideWith = this.game.map.getLayer(layer)
      this.game.physics.add.collider(layerToCollideWith, this.sprite)
    })
  }

  update() {
    this.updateList.forEach((component) => {
      component.update()
    })
  }
}
