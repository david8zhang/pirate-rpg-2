import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import Game from '~/scenes/Game'

export interface SpeechBoxConfig {
  wrapWidth: number
  fixedWidth: number
  fixedHeight: number
  x: number
  y: number
}

export class SpeechBox {
  private game: Game
  private config: SpeechBoxConfig
  private textBox: TextBox

  public static COLOR_PRIMARY = 0x4e342e
  public static COLOR_LIGHT = 0x7b5e57
  public static COLOR_DARK = 0x260e04

  public isActive: boolean = true

  constructor(game: Game, config: SpeechBoxConfig) {
    this.game = game
    this.config = config

    const { x, y } = config
    this.textBox = this.game.rexUI.add
      .textBox({
        x,
        y,
        background: this.createSpeechBubbleShape(SpeechBox.COLOR_PRIMARY, SpeechBox.COLOR_LIGHT),
        text: this.getBBCodeText(),
        action: this.game.add
          .image(0, 0, 'nextPage')
          .setTint(SpeechBox.COLOR_LIGHT)
          .setVisible(false),
        space: {
          left: 30,
          right: 10,
          top: 10,
          bottom: 25,
          icon: 10,
          text: 10,
        },
      })
      .setOrigin(0, 1)
      .layout()

    this.textBox
      .setInteractive()
      .on('pointerdown', () => {
        if (this.isActive) {
          const icon = this.textBox.getElement('action') as any
          icon!.setVisible(false)
          this.textBox.resetChildVisibleState(icon)
          if (this.textBox.isTyping) {
            this.textBox.stop(true)
          } else {
            this.textBox.typeNextPage()
          }
          if (this.textBox.isLastPage) {
            this.setVisible(false)
          }
        }
      })
      .on('pageend', () => {
        if (this.isActive) {
          if (this.textBox.isLastPage) {
            return
          }
          var icon = this.textBox.getElement('action') as any
          icon!.setVisible(true)
          this.textBox.resetChildVisibleState(icon)
          icon.y -= 30
          this.game.tweens.add({
            targets: icon,
            y: '+=30', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false,
          })
        }
      })
  }

  setVisible(isVisible: boolean) {
    this.textBox.setVisible(isVisible)
    const icon = this.textBox.getElement('action') as any
    icon.setVisible(isVisible)
    this.isActive = isVisible
  }

  displayText(content: string, typingSpeed: number) {
    this.setVisible(true)
    this.textBox.start(content, typingSpeed)
  }

  getBBCodeText() {
    const { wrapWidth, fixedWidth, fixedHeight } = this.config
    return this.game.rexUI.add.BBCodeText(0, 0, '', {
      fixedWidth,
      fixedHeight,
      fontSize: '20px',
      wrap: {
        mode: 'word',
        width: wrapWidth,
      },
      maxLines: 3,
    })
  }

  setPosition(x: number, y: number) {
    this.textBox.setPosition(x, y)
  }

  getBuiltInText() {
    const { wrapWidth, fixedWidth, fixedHeight } = this.config
    return this.game.add
      .text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
          width: wrapWidth,
        },
        maxLines: 3,
      })
      .setFixedSize(fixedWidth, fixedHeight)
  }

  createSpeechBubbleShape(fillColor, strokeColor) {
    return this.game.rexUI.add.customShapes({
      create: { lines: 1 },
      update: function () {
        var radius = 20
        var indent = 15

        var left = 0,
          right = this.width,
          top = 0,
          bottom = this.height,
          boxBottom = bottom - indent

        const shape: any = this.getShapes()[0]
        shape
          .lineStyle(2, strokeColor, 1)
          .fillStyle(fillColor, 1)
          // top line, right arc
          .startAt(left + radius, top)
          .lineTo(right - radius, top)
          .arc(right - radius, top + radius, radius, 270, 360)
          // right line, bottom arc
          .lineTo(right, boxBottom - radius)
          .arc(right - radius, boxBottom - radius, radius, 0, 90)
          .lineTo(left + radius, boxBottom)
          .arc(left + radius, boxBottom - radius, radius, 90, 180)
          // left line, top arc
          .lineTo(left, top + radius)
          .arc(left + radius, top + radius, radius, 180, 270)
          .close()
      },
    })
  }
}
