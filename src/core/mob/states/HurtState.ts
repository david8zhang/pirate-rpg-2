import { State } from '~/core/StateMachine'
import { Constants } from '~/utils/Constants'
import { Mob } from '../Mob'
import { MobStates } from './MobStates'

export class HurtState extends State {
  enter(mob: Mob, damage: number, prevState: MobStates) {
    const sprite = mob.getBaseSprite()
    mob.moveController.stop()
    mob.game.cameras.main.shake(100, 0.005)
    mob.takeDamage(damage)
    sprite.setTint(0xff0000)
    mob.animController.playHurtAnimation(mob.getDirection(), () => {
      console.log('Went here!')
      sprite.setTint(0xffffff)
      if (mob.health === 0) {
        mob.stateMachine.transition(MobStates.DEATH)
      } else {
        mob.stateMachine.transition(prevState)
      }
    })
    mob.game.time.delayedCall(Constants.ATTACK_DURATION, () => {
      mob.isHit = false
    })
  }
}
