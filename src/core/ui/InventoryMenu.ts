import { Inventory } from '../player/Inventory'
import { GameUI } from '~/scenes/GameUI'
import { TooltipPosition } from './ItemTooltip'
import { text } from './components/Text'

export class ItemBox {
  // Dimensions
  public static WIDTH = 30
  public static HEIGHT = 30
  public static PADDING_WITHIN_BOX = 20

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

  // Detect double clicked
  public isClicked: boolean = false
  public isHighlighted: boolean = false

  constructor(scene: Phaser.Scene, xPos: number, yPos: number, disableCount?: boolean) {
    this.scene = scene
    this.x = xPos
    this.y = yPos
    this.panel = scene.add
      .nineslice(
        xPos,
        yPos,
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

    this.sprite = scene.add.sprite(xPos, yPos, '').setScale(2)
    this.sprite.setVisible(false)

    this.container = scene.add.container(35, 35)
    this.container.add(this.panel)
    this.container.add(this.sprite)
    if (!disableCount) {
      const countText = text('', { fontSize: '15', fontFamily: 'GraphicPixel', color: 'white' })
      this.countText = scene.add.dom(xPos + 10, yPos - 10, countText).setOrigin(0)
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
    if (this.itemName && !this.isEmpty) {
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

export class InventoryMenu {
  private scene: Phaser.Scene
  private numRows: number = 5
  private numCols: number = 5

  private itemBoxes: ItemBox[][] = []
  private isExpanded: boolean = false

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  toggleInventoryExpand() {
    this.isExpanded = !this.isExpanded
    this.updateInventoryExpandState()
  }

  show() {
    for (let i = 0; i < this.itemBoxes.length; i++) {
      for (let j = 0; j < this.itemBoxes[0].length; j++) {
        if (i > 0) {
          this.itemBoxes[i][j].setVisible(this.isExpanded)
        } else {
          this.itemBoxes[i][j].setVisible(true)
        }
      }
    }
  }

  hide() {
    for (let i = 0; i < this.itemBoxes.length; i++) {
      for (let j = 0; j < this.itemBoxes[0].length; j++) {
        this.itemBoxes[i][j].setVisible(false)
      }
    }
  }

  public updateInventoryExpandState() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (i > 0) {
          this.itemBoxes[i][j].setVisible(this.isExpanded)
        }
      }
    }
  }

  public initialize() {
    const paddingBetweenBox = 25
    for (let i = 0; i < this.numRows; i++) {
      const yPos = i * (ItemBox.WIDTH + paddingBetweenBox)
      this.itemBoxes[i] = new Array(this.numCols)
      for (let j = 0; j < this.numCols; j++) {
        const xPos = j * (ItemBox.WIDTH + paddingBetweenBox)
        this.itemBoxes[i][j] = new ItemBox(this.scene, xPos, yPos)
        if (i > 0) {
          this.itemBoxes[i][j].setVisible(false)
        }
      }
    }
  }

  public updateInventoryMenu(inventory: Inventory, onItemClick: Function) {
    for (let i = 0; i < this.itemBoxes.length; i++) {
      for (let j = 0; j < this.itemBoxes[0].length; j++) {
        this.itemBoxes[i][j].removeItem()
      }
    }
    let inventoryIndex = 0
    const inventoryTypes = Object.keys(inventory)
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        const itemName = inventoryTypes[inventoryIndex]
        if (itemName) {
          const { count, texture } = inventory[itemName]
          this.itemBoxes[i][j].setItem(count, itemName, texture)
          this.itemBoxes[i][j].itemClickHandler = onItemClick
          inventoryIndex++
        }
      }
    }
  }
}
