import { State } from '~/core/StateMachine'
import { Player } from '../Player'
import { PlayerStates } from './PlayerStates'

export class MoveState extends State {
  execute(player: Player) {
    const moveController = player.moveController
    moveController.handleMovement()

    if (player.attackController && player.attackController.detectAttack()) {
      this.stateMachine.transition(PlayerStates.ATTACK)
    } else if (!moveController.detectMovement()) {
      this.stateMachine.transition(PlayerStates.IDLE)
    } else {
      const direction = player.getDirection()
      if (direction) {
        player.animController.playMoveAnimation(direction)
      }
    }
  }
}
