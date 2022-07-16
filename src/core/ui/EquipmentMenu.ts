import { ItemBox } from './ItemBox'

export class EquipmentMenu {
  private static MENU_Y_POS = 175
  private static MENU_X_POS = 68
  private static PADDING = 5

  public scene: Phaser.Scene
  public headBox: ItemBox
  public weaponBox: ItemBox
  public chestBox: ItemBox
  public armsBox: ItemBox
  public pantsBox: ItemBox
  public isVisible: boolean = false
  public onItemClick: Function | null = null

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.headBox = new ItemBox({
      scene,
      x: EquipmentMenu.MENU_X_POS,
      y: EquipmentMenu.MENU_Y_POS,
      disableCount: true,
      disableTooltip: true,
    })
    this.chestBox = new ItemBox({
      scene,
      x: this.headBox.panel.x,
      y: EquipmentMenu.MENU_Y_POS + this.headBox.panel.height + EquipmentMenu.PADDING,
      disableCount: true,
      disableTooltip: true,
    })
    this.armsBox = new ItemBox({
      scene,
      x: this.chestBox.panel.x - (this.chestBox.panel.width + EquipmentMenu.PADDING),
      y: EquipmentMenu.MENU_Y_POS + this.headBox.panel.height + EquipmentMenu.PADDING,
      disableCount: true,
      disableTooltip: true,
    })
    this.weaponBox = new ItemBox({
      scene,
      x: this.chestBox.panel.x + this.chestBox.panel.width + EquipmentMenu.PADDING,
      y: this.chestBox.panel.y,
      disableCount: true,
      disableTooltip: true,
    })
    this.pantsBox = new ItemBox({
      scene,
      x: this.chestBox.panel.x,
      y: this.chestBox.panel.y + this.chestBox.panel.height + EquipmentMenu.PADDING,
      disableCount: true,
      disableTooltip: true,
    })

    this.chestBox.setVisible(this.isVisible)
    this.headBox.setVisible(this.isVisible)
    this.weaponBox.setVisible(this.isVisible)
    this.pantsBox.setVisible(this.isVisible)
    this.armsBox.setVisible(this.isVisible)

    this.chestBox.itemClickHandler = () => {
      this.onUnequipItem(this.chestBox)
    }
    this.headBox.itemClickHandler = () => {
      this.onUnequipItem(this.headBox)
    }
    this.weaponBox.itemClickHandler = () => {
      this.onUnequipItem(this.weaponBox)
    }
    this.pantsBox.itemClickHandler = () => {
      this.onUnequipItem(this.pantsBox)
    }
    this.armsBox.itemClickHandler = () => {
      this.onUnequipItem(this.armsBox)
    }
  }

  toggleVisible() {
    this.isVisible = !this.isVisible
    this.armsBox.setVisible(this.isVisible)
    this.chestBox.setVisible(this.isVisible)
    this.headBox.setVisible(this.isVisible)
    this.weaponBox.setVisible(this.isVisible)
    this.pantsBox.setVisible(this.isVisible)
  }

  onUnequipItem(itemBox: ItemBox) {
    if (this.onItemClick) {
      this.onItemClick(itemBox)
      itemBox.removeItem()
    }
  }
}
