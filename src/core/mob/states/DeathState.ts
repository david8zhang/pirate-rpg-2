import { State } from '~/core/StateMachine'
import { Mob } from '../Mob'

export class DeathState extends State {
  enter(mob: Mob) {
    mob.moveController.stop()
    mob.animController.playDeathAnimation(mob.getDirection(), () => {
      mob.destroy()
    })
  }
}
