import { State } from '~/core/StateMachine'
import { Constants } from '~/utils/Constants'
import { Direction } from '../MoveController'
import { Player } from '../Player'

export class IdleState extends State {
  enter(player: Player) {
    player.animController.playIdleAnimation(Direction.DOWN)
  }

  execute(player: Player) {
    if (player.moveController.detectMovement()) {
      this.stateMachine.transition('move')
    }
    const currDirection = player.moveController.currDirection
    if (currDirection) {
      player.animController.playIdleAnimation(currDirection)
    }
  }
}
