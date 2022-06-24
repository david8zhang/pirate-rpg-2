import Game from '~/scenes/Game'
import { MoveController } from './MoveController'
import { StateMachine } from '../StateMachine'
import { IdleState } from './states/IdleState'
import { MoveState } from './states/MoveState'
import { AnimationController } from './AnimationController'
import { AttackController } from './AttackController'
import { AttackState } from './states/AttackState'

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
  public stateMachine: StateMachine
  public moveController: MoveController
  public animController: AnimationController
  public attackController: AttackController

  constructor(game: Game, config: PlayerConfig) {
    this.game = game

    this.animController = new AnimationController(config, game)
    this.moveController = new MoveController(this.animController.sprites, this.game)
    this.attackController = new AttackController(game, this)
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
        move: new MoveState(),
        attack: new AttackState(),
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
  }

  public stop() {
    this.moveController.stop()
  }

  getDirection() {
    return this.moveController.currDirection
  }

  getCurrState() {
    return this.stateMachine.getState()
  }
}
