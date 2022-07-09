import { State } from '~/core/StateMachine'
import { Direction } from '~/utils/Constants'
import { Mob } from '../Mob'

export class IdleState extends State {
  enter(mob: Mob) {
    const currDirection = mob.getDirection()
    if (currDirection) {
      mob.animController.playIdleAnimation(currDirection)
    } else {
      mob.animController.playIdleAnimation(Direction.DOWN)
    }
  }

  execute(mob: Mob) {
    const currDirection = mob.moveController.currDirection
    if (currDirection) {
      mob.animController.playIdleAnimation(currDirection)
    }
  }
}
