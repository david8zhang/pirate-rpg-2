import { Scene } from 'phaser'
import Game from '~/scenes/Game'
import { GameUI } from '~/scenes/GameUI'
import { Constants } from '~/utils/Constants'
import { NPC } from './NPC'
import { SpeechBox } from './SpeechBox'

export interface SpeechControllerConfig {
  gameRef: Game
  npc: NPC
  dialog: string
}

export class SpeechController {
  private npc: NPC
  private uiScene: GameUI
  private game: Game
  private speechBox: SpeechBox
  private dialog: string

  public static SPEECH_BOX_WIDTH = Constants.SCREEN_WIDTH - 200
  public static SPEECH_BOX_HEIGHT = 75

  constructor(uiScene: GameUI, speechControllerConfig: SpeechControllerConfig) {
    const { npc, gameRef, dialog } = speechControllerConfig
    this.npc = npc
    this.uiScene = uiScene
    this.game = gameRef
    this.speechBox = new SpeechBox(this.uiScene, {
      fixedHeight: SpeechController.SPEECH_BOX_HEIGHT,
      fixedWidth: SpeechController.SPEECH_BOX_WIDTH,
      wrapWidth: SpeechController.SPEECH_BOX_WIDTH,
      x: 0,
      y: 0,
    })
    this.dialog = dialog
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
      new Phaser.Math.Vector2(this.game.player.position.x, this.game.player.position.y),
      new Phaser.Math.Vector2(this.npc.sprite.x, this.npc.sprite.y)
    )
    if (positionToPlayer < Constants.NPC_CHAT_THRESHOLD) {
      this.speechBox.setPosition(
        60,
        Constants.SCREEN_HEIGHT - SpeechController.SPEECH_BOX_HEIGHT / 2
      )
      this.speechBox.displayText(this.dialog, 50)
    }
  }
}
