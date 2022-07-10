import { State } from '~/core/StateMachine'

import { Player } from '../Player'

export class AttackState extends State {
  enter(player: Player) {
    player.stop()
    const currDirection = player.getDirection()
    if (currDirection) {
      player.colliderController.activateAttackHitbox(currDirection)
      player.animController.playAttackAnimation(currDirection, false, () => {
        this.stateMachine.transition('idle')
        player.colliderController.deactivateAttackHitbox()
        player.game.isHarvestableCollided = false
        player.game.isMobCollided = false
      })
    }
  }
}
