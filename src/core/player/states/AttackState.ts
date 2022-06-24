import { State } from '~/core/StateMachine'
import Game from '~/scenes/Game'
import { Player } from '../Player'

export class AttackState extends State {
  enter(player: Player) {
    player.stop()
    const currDirection = player.getDirection()
    if (currDirection) {
      player.animController.playAttackAnimation(currDirection, false, () => {
        this.stateMachine.transition('idle')
      })
    }
  }
}
