import Game from '~/scenes/Game'
import { GameUI } from '~/scenes/GameUI'
import { SpeechController } from './SpeechController'

export interface NPCConfig {
  position: {
    x: number
    y: number
  }
  scale: {
    x: number
    y: number
  }
  texture: string
  dialog: string
}

export class NPC {
  private game: Game
  public sprite: Phaser.Physics.Arcade.Sprite
  private updateList: any[] = []

  constructor(game: Game, config: NPCConfig) {
    this.game = game
    const { position, scale, dialog } = config
    this.sprite = this.game.physics.add
      .sprite(position.x, position.y, config.texture)
      .setScale(scale.x, scale.y)
    const speechController = new SpeechController(GameUI.instance, {
      gameRef: this.game,
      npc: this,
      dialog,
    })
    this.updateList.push(speechController)
  }

  update() {
    this.updateList.forEach((component) => {
      component.update()
    })
  }
}
