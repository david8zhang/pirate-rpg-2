import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { InventoryMenu } from '~/core/ui/InventoryMenu'
import { ItemTooltip } from '~/core/ui/ItemTooltip'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI
  public itemTooltip!: ItemTooltip
  public inventoryMenu!: InventoryMenu
  public rexUI!: RexUIPlugin

  constructor() {
    super('ui')
    GameUI._instance = this
  }

  preload() {
    this.initializeInventory()
  }

  initializeInventory() {
    this.inventoryMenu = new InventoryMenu(this)
    this.inventoryMenu.initialize()
    this.itemTooltip = new ItemTooltip(this, 0, 0)
  }

  public static get instance() {
    return GameUI._instance
  }

  update() {
    this.itemTooltip.update()
  }
}
