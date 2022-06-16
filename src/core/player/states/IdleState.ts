import { State } from '~/core/StateMachine'
import { Player } from '../Player'

export class IdleState extends State {
  enter(player: Player) {
    player.baseSprite.anims.play('player-base-idle-front')
    player.armsSprite.anims.play('player-arms-idle-front')
  }
}
