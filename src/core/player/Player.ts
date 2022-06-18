import Game from '~/scenes/Game'
import { MoveController } from '../MoveController'
import { StateMachine } from '../StateMachine'
import { IdleState } from './states/IdleState'
import { MoveState } from './states/MoveState'

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
  public baseSprite: Phaser.Physics.Arcade.Sprite
  public armsSprite: Phaser.Physics.Arcade.Sprite

  private game: Game
  private updateList: any[] = []
  public stateMachine: StateMachine
  public moveController: MoveController

  constructor(game: Game, config: PlayerConfig) {
    this.game = game

    // Sprites
    this.baseSprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, 'player-base')
      .setScale(config.scale.x, config.scale.y)
      .setDepth(1)
    this.game.physics.world.enableBody(this.baseSprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    this.armsSprite = this.game.physics.add
      .sprite(config.position.x, config.position.y, 'player-arms')
      .setScale(config.scale.x, config.scale.y)
      .setDepth(this.baseSprite.depth + 1)
    this.game.physics.world.enableBody(this.armsSprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    this.moveController = new MoveController([this.baseSprite, this.armsSprite], this.game)

    if (config.layersToCollideWith) {
      this.setupTilemapCollision(config.layersToCollideWith)
    }
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
        move: new MoveState(),
      },
      [this]
    )
  }

  setupTilemapCollision(layersToCollideWith: string[]) {
    layersToCollideWith.forEach((layer: string) => {
      const layerToCollideWith = this.game.map.getLayer(layer)
      this.game.physics.add.collider(layerToCollideWith, this.baseSprite)
      this.game.physics.add.collider(layerToCollideWith, this.armsSprite)
    })
  }

  update() {
    this.stateMachine.step()
    this.updateList.forEach((component) => {
      component.update()
    })
  }
}
