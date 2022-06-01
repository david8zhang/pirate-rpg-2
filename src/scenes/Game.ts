import Phaser from 'phaser'
import { Player } from '~/core/Player'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { SpeechBox } from '~/core/SpeechBox'
import { NPC } from '~/core/NPC'

export default class Game extends Phaser.Scene {
  public player!: Player
  public rexUI!: RexUIPlugin

  constructor() {
    super('game')
  }

  create() {
    this.player = new Player(this, {
      position: { x: 100, y: 100 },
      scale: { x: 0.3, y: 0.3 },
    })

    const npc = new NPC(this, {
      position: { x: 200, y: 200 },
      scale: { x: 0.3, y: 0.3 },
    })
  }

  update() {
    this.player.update()
  }
}
