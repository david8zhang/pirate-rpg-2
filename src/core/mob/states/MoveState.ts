import { State } from '~/core/StateMachine'
import { Direction } from '~/utils/Constants'
import { Mob } from '../Mob'
import { MobStates } from './MobStates'

export class MoveState extends State {
  private lastTickTimestamp: number = 0
  enter() {
    this.lastTickTimestamp = 0
  }

  execute(mob: Mob) {
    const currTimestamp = Date.now()
    if (currTimestamp - this.lastTickTimestamp > 3000) {
      const shouldIdle = Phaser.Math.Between(0, 1) == 2
      this.lastTickTimestamp = currTimestamp
      if (shouldIdle) {
        mob.stateMachine.transition(MobStates.IDLE)
      } else {
        const directions = [Direction.UP]
        const randIndex = Phaser.Math.Between(0, directions.length - 1)
        const randDirection = directions[randIndex]
        mob.moveController.currDirection = randDirection
        mob.animController.playMoveAnimation(randDirection)
        mob.moveController.handleMovement()
      }
    }
  }
}
