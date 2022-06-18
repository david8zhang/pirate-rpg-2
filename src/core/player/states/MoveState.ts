import { State } from '~/core/StateMachine'
import { Player } from '../Player'

export class MoveState extends State {
  execute(player: Player) {
    player.moveController.handlePlayerMovement()
  }
}
