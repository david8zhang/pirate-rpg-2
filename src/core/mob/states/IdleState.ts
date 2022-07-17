import { State } from '~/core/StateMachine'
import { Direction } from '~/utils/Constants'
import { Mob } from '../Mob'
import { MobStates } from './MobStates'

export class IdleState extends State {
  private lastTickTimestamp: number = 0
  enter(mob: Mob) {
    this.lastTickTimestamp = 0
    const currDirection = mob.getDirection()
    if (currDirection) {
      mob.animController.playIdleAnimation(currDirection)
    } else {
      mob.animController.playIdleAnimation(Direction.DOWN)
    }
  }

  execute(mob: Mob) {
    const currTimestamp = Date.now()
    if (currTimestamp - this.lastTickTimestamp > 1000) {
      this.lastTickTimestamp = currTimestamp
      const shouldMove = Phaser.Math.Between(0, 1) == 0
      if (shouldMove) {
        mob.stateMachine.transition(MobStates.MOVE)
      } else {
        const currDirection = mob.getDirection()
        mob.animController.playIdleAnimation(currDirection)
      }
    }
  }
}
