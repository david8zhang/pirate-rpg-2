import Game from '~/scenes/Game'
import { MoveController } from './MoveController'
import { StateMachine } from '../StateMachine'
import { IdleState } from './states/IdleState'
import { MoveState } from './states/MoveState'
import { AnimationController } from './AnimationController'

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
  private game: Game
  private updateList: any[] = []
  public stateMachine: StateMachine
  public moveController: MoveController
  public animController: AnimationController

  constructor(game: Game, config: PlayerConfig) {
    this.game = game

    this.animController = new AnimationController(config, game)
    this.moveController = new MoveController(this.animController.sprites, this.game)
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
        move: new MoveState(),
      },
      [this]
    )
  }

  get position() {
    const baseSprite = this.animController.getSpriteByName('player-base')
    return {
      x: baseSprite?.x,
      y: baseSprite?.y,
    }
  }

  update() {
    this.stateMachine.step()
    this.updateList.forEach((component) => {
      component.update()
    })
  }

  getDirection() {
    return this.moveController.currDirection
  }

  getCurrState() {
    return this.stateMachine.getState()
  }
}
