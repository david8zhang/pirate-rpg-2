import Game from '~/scenes/Game'
import { Constants } from '~/utils/Constants'
import { NPC } from './NPC'
import { SpeechBox } from './SpeechBox'

export class SpeechController {
  private npc: NPC
  private game: Game
  private speechBox: SpeechBox

  public static SPEECH_BOX_WIDTH = Constants.GAME_WIDTH - 200
  public static SPEECH_BOX_HEIGHT = 75

  constructor(game: Game, npc: NPC) {
    this.npc = npc
    this.game = game
    this.speechBox = new SpeechBox(this.game, {
      fixedHeight: SpeechController.SPEECH_BOX_HEIGHT,
      fixedWidth: SpeechController.SPEECH_BOX_WIDTH,
      wrapWidth: SpeechController.SPEECH_BOX_WIDTH,
      x: 0,
      y: 0,
    })
    this.setupKeyboardListener()
  }

  setupKeyboardListener() {
    this.game.input.keyboard.on('keydown', (e) => {
      if (e.code === 'KeyE') {
        this.handleChatboxOpen()
      }
    })
  }

  handleChatboxOpen() {
    const positionToPlayer = Phaser.Math.Distance.BetweenPoints(
      new Phaser.Math.Vector2(this.game.player.sprite.x, this.game.player.sprite.y),
      new Phaser.Math.Vector2(this.npc.sprite.x, this.npc.sprite.y)
    )
    if (positionToPlayer < Constants.NPC_CHAT_THRESHOLD) {
      this.speechBox.setPosition(60, Constants.GAME_HEIGHT - SpeechController.SPEECH_BOX_HEIGHT / 2)
      this.speechBox.displayText('Hello world', 50)
    }
  }
}
