import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { EquipmentMenu } from '~/core/ui/EquipmentMenu'
import { InventoryMenu } from '~/core/ui/InventoryMenu'
import { ItemTooltip } from '~/core/ui/ItemTooltip'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI
  public itemTooltip!: ItemTooltip
  public inventoryMenu!: InventoryMenu
  public equipMenu!: EquipmentMenu
  public rexUI!: RexUIPlugin

  constructor() {
    super('ui')
    GameUI._instance = this
  }

  create() {}

  preload() {
    this.initializeInventory()
    this.initializeEquipment()
  }

  initializeEquipment() {
    this.equipMenu = new EquipmentMenu(this)
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
