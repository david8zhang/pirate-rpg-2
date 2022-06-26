import { State } from '~/core/StateMachine'
import { Direction } from '../controllers/MoveController'
import { Player } from '../Player'

export class IdleState extends State {
  enter(player: Player) {
    const currDirection = player.getDirection()
    if (currDirection) {
      player.animController.playIdleAnimation(currDirection)
    } else {
      player.animController.playIdleAnimation(Direction.DOWN)
    }
  }

  execute(player: Player) {
    if (player.attackController && player.attackController.detectAttack()) {
      this.stateMachine.transition('attack')
    } else if (player.moveController.detectMovement()) {
      this.stateMachine.transition('move')
    } else {
      const currDirection = player.moveController.currDirection
      if (currDirection) {
        player.animController.playIdleAnimation(currDirection)
      }
    }
  }
}
