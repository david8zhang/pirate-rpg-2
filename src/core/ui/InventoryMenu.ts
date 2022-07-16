import { Inventory } from '../player/managers/InventoryManager'
import { ItemBox } from './ItemBox'

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
    const paddingBetweenBox = 12
    for (let i = 0; i < this.numRows; i++) {
      const yPos = i * (ItemBox.WIDTH + paddingBetweenBox)
      this.itemBoxes[i] = new Array(this.numCols)
      for (let j = 0; j < this.numCols; j++) {
        const xPos = j * (ItemBox.WIDTH + paddingBetweenBox)
        this.itemBoxes[i][j] = new ItemBox({
          scene: this.scene,
          x: xPos,
          y: yPos,
        })
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
