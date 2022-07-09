import { State } from '~/core/StateMachine'
import { Player } from '../Player'

export class MoveState extends State {
  execute(player: Player) {
    const moveController = player.moveController
    moveController.handleMovement()

    if (player.attackController && player.attackController.detectAttack()) {
      this.stateMachine.transition('attack')
    } else if (!moveController.detectMovement()) {
      this.stateMachine.transition('idle')
    } else {
      const direction = player.getDirection()
      if (direction) {
        player.animController.playMoveAnimation(direction)
      }
    }
  }
}
