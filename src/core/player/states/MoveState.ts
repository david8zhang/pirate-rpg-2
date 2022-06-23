import { State } from '~/core/StateMachine'
import { Constants } from '~/utils/Constants'
import { Player } from '../Player'

export class MoveState extends State {
  execute(player: Player) {
    const moveController = player.moveController
    moveController.handlePlayerMovement()

    if (!moveController.detectMovement()) {
      this.stateMachine.transition('idle')
    }

    if (moveController.currDirection) {
      player.animController.playMoveAnimation(moveController.currDirection)
    }
  }
}
