import { State } from '~/core/StateMachine'
import Game from '~/scenes/Game'
import { Player } from '../Player'

export class MoveState extends State {
  execute(player: Player) {
    const moveController = player.moveController
    moveController.handlePlayerMovement()

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
