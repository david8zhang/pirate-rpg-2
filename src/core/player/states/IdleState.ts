import { State } from '~/core/StateMachine'
import { Direction } from '~/utils/Constants'
import { Player } from '../Player'
import { PlayerStates } from './PlayerStates'

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
      this.stateMachine.transition(PlayerStates.ATTACK)
    } else if (player.moveController.detectMovement()) {
      this.stateMachine.transition(PlayerStates.MOVE)
    } else {
      const currDirection = player.moveController.currDirection
      if (currDirection) {
        player.animController.playIdleAnimation(currDirection)
      }
    }
  }
}
