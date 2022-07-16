import { State } from '~/core/StateMachine'
import { Mob } from '../Mob'
import { MobStates } from './MobStates'

export class HurtState extends State {
  enter(mob: Mob) {
    mob.animController.playHurtAnimation(mob.getDirection(), () => {
      mob.stateMachine.transition(MobStates.IDLE)
    })
  }
}
