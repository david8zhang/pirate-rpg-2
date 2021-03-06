import { State } from '~/core/StateMachine'

import { Player } from '../Player'
import { PlayerStates } from './PlayerStates'

export class AttackState extends State {
  enter(player: Player) {
    player.stop()
    const currDirection = player.getDirection()
    if (currDirection) {
      const isArmed = player.isArmed()
      if (!isArmed) {
        player.colliderController.activateAttackHitbox(currDirection)
      }
      player.playWeaponAttackAnimation()
      player.animController.playAttackAnimation(currDirection, isArmed, () => {
        this.stateMachine.transition(PlayerStates.IDLE)
        if (!isArmed) {
          player.colliderController.deactivateAttackHitbox()
        }
        player.game.isHarvestableCollided = false
        player.game.isMobCollided = false
      })
    }
  }
}
