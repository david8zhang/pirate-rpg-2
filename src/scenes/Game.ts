import Phaser from 'phaser'
import { Player } from '~/core/Player'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { SpeechBox } from '~/core/SpeechBox'

export default class Game extends Phaser.Scene {
  private player!: Player
  rexUI!: RexUIPlugin

  constructor() {
    super('game')
  }

  create() {
    this.player = new Player(this, {
      position: { x: 100, y: 100 },
      scale: { x: 0.3, y: 0.3 },
    })

    var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`
    const textBox = new SpeechBox(this, {
      wrapWidth: 500,
      fixedWidth: 500,
      fixedHeight: 65,
      x: 100,
      y: 500,
    })
    textBox.displayText(content, 50)
  }

  update() {
    this.player.update()
  }
}
