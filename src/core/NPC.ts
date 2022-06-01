import Game from '~/scenes/Game'
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
}

export class NPC {
  private game: Game
  public sprite: Phaser.Physics.Arcade.Sprite
  private updateList: any[] = []

  constructor(game: Game, config: NPCConfig) {
    this.game = game
    const { position, scale } = config
    this.sprite = this.game.physics.add
      .sprite(position.x, position.y, 'npc')
      .setScale(scale.x, scale.y)
    const speechController = new SpeechController(this.game, this)
    this.updateList.push(speechController)
  }

  update() {
    this.updateList.forEach((component) => {
      component.update()
    })
  }
}
