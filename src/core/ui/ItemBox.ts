import { GameUI } from '~/scenes/GameUI'
import { text } from './components/Text'
import { TooltipPosition } from './ItemTooltip'

export interface ItemBoxConfig {
  scene: Phaser.Scene
  x: number
  y: number
  disableCount?: boolean
  disableTooltip?: boolean
}

export class ItemBox {
  // Dimensions
  public static WIDTH = 22
  public static HEIGHT = 22
  public static PADDING_WITHIN_BOX = 10

  // Item contained inside
  private sprite!: Phaser.GameObjects.Sprite
  public itemName!: string
  public countText!: Phaser.GameObjects.DOMElement

  // instance vars
  private scene: Phaser.Scene
  public y: number
  public x: number
  private container: Phaser.GameObjects.Container
  public panel: Phaser.GameObjects.RenderTexture

  // Tooltip position
  public tooltipPosition: TooltipPosition = TooltipPosition.BOTTOM_RIGHT
  public itemClickHandler: Function = () => {}
  public isEmpty: boolean = true
  public isTooltipDisabled: boolean = false

  // Detect double clicked
  public isClicked: boolean = false
  public isHighlighted: boolean = false

  constructor(config: ItemBoxConfig) {
    const { x, y, scene, disableCount, disableTooltip } = config
    this.scene = scene
    this.x = x
    this.y = y
    this.isTooltipDisabled = disableTooltip ? disableTooltip : false
    this.panel = scene.add
      .nineslice(
        x,
        y,
        ItemBox.WIDTH + ItemBox.PADDING_WITHIN_BOX,
        ItemBox.HEIGHT + ItemBox.PADDING_WITHIN_BOX,
        'panel',
        5
      )
      .setOrigin(0.5)
    this.panel.tint = 0xaaaaaa
    this.panel.setAlpha(0.9)
    this.panel
      .setInteractive({ useHandCursor: true })
      .on('pointerover', this.handleItemHover, this)
      .on('pointerout', this.handleItemExitHover, this)
      .on('pointerdown', this.onItemClick, this)

    this.sprite = scene.add.sprite(x, y, '').setScale(1)
    this.sprite.setVisible(false)

    this.container = scene.add.container(25, 25)
    this.container.add(this.panel)
    this.container.add(this.sprite)
    if (!disableCount) {
      const countText = text('', { fontSize: '10px', fontFamily: 'GraphicPixel', color: 'white' })
      this.countText = scene.add.dom(x + 5, y - 5, countText).setOrigin(0)
      this.container.add(this.countText)
    }
  }

  setTextColor(color: string) {
    const currCount = this.countText.getData('value')
    const newCountText = text(currCount ? currCount.toString() : '', {
      fontSize: '10px',
      fontFamily: 'GraphicPixel',
      color,
    })
    this.countText.setElement(newCountText)
  }

  handleItemHover() {
    if (this.itemName && !this.isEmpty && !this.isTooltipDisabled) {
      GameUI.instance.itemTooltip.position = this.tooltipPosition
      GameUI.instance.itemTooltip.itemName = this.itemName
    }
  }

  handleItemExitHover() {
    GameUI.instance.itemTooltip.itemName = ''
  }

  setItem(count: number, itemName: string, texture: string) {
    this.itemName = itemName
    this.sprite.setTexture(texture)
    if (count > 0) {
      this.isEmpty = false
      this.sprite.setVisible(true)
    }
    if (this.countText) {
      this.countText.setData('value', count)
      this.countText.setText(count.toString())
      this.countText.setVisible(true)
    }
  }

  setVisible(isVisible: boolean) {
    this.container.setVisible(isVisible)
    if (this.countText) {
      this.countText.setVisible(isVisible)
    }
  }

  removeItem() {
    this.sprite.setTexture('')
    this.sprite.setVisible(false)
    this.isEmpty = true

    if (this.countText) {
      this.countText.setData('value', null)
      this.countText.setText('')
      this.countText.setVisible(false)
    }
  }

  onItemClick(pointer: Phaser.Input.Pointer) {
    if (this.isEmpty) {
      return
    }
    if (this.isClicked) {
      this.itemClickHandler(this.itemName, this)
    } else {
      this.isClicked = true
      this.scene.time.delayedCall(500, () => {
        this.isClicked = false
      })
    }
  }

  setHighlight(isHighlighted: boolean) {
    this.isHighlighted = isHighlighted
  }

  destroy() {
    this.panel.destroy()
    this.sprite.destroy()
    this.container.destroy()
  }
}
