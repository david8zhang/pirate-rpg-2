import { State } from '~/core/StateMachine'
import { Constants } from '~/utils/Constants'
import { Player } from '../Player'

export class MoveState extends State {
  execute(player: Player) {
    const moveController = player.moveController
    moveController.handlePlayerMovement()

    if (!moveController.detectMovement()) {
      this.stateMachine.transition('idle')
    }

    if (moveController.currDirection) {
      const animDirection = Constants.getAnimationDirection(moveController.currDirection)

      // Play animations
      player.baseSprite.anims.play(`player-base-walk-${animDirection}`, true)
      player.armsSprite.anims.play(`player-arms-walk-${animDirection}`, true)
    }
  }
}
