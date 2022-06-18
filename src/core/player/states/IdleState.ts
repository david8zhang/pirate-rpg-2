import { State } from '~/core/StateMachine'
import { Constants } from '~/utils/Constants'
import { Player } from '../Player'

export class IdleState extends State {
  enter(player: Player) {
    player.baseSprite.anims.play('player-base-idle-front')
    player.armsSprite.anims.play('player-arms-idle-front')
  }

  execute(player: Player) {
    if (player.moveController.detectMovement()) {
      this.stateMachine.transition('move')
    }
    const currDirection = player.moveController.currDirection
    if (currDirection) {
      const animDirection = Constants.getAnimationDirection(currDirection)
      player.baseSprite.play(`player-base-idle-${animDirection}`, true)
      player.armsSprite.play(`player-arms-idle-${animDirection}`, true)
    }
  }
}
