import { Item } from '~/core/object/Item'
import { ItemBox } from '~/core/ui/InventoryMenu'
import Game from '~/scenes/Game'
import { GameUI } from '~/scenes/GameUI'
import { Player } from '../Player'

export interface Inventory {
  [key: string]: {
    count: number
    texture: string
  }
}

export interface InventoryManagerConfig {
  player: Player
  game: Game
}

export class InventoryManager {
  private player: Player
  private game: Game
  public inventory: Inventory
  public itemOnHover: Item | null = null

  constructor(config: InventoryManagerConfig) {
    // Inventory management
    this.inventory = {}
    const { player, game } = config
    this.player = player
    this.game = game
    this.game.input.keyboard.on('keydown', (keycode: any) => {
      if (keycode.code === 'KeyI') {
        console.log('Went Here!')
        GameUI.instance.inventoryMenu.toggleInventoryExpand()
      }
      if (keycode.code === 'KeyE') {
        if (this.itemOnHover) {
          this.addItem(this.itemOnHover)
          this.game.removeItem(this.itemOnHover)
          this.itemOnHover = null
        }
      }
    })
  }

  addItem(item: Item) {
    if (!this.inventory[item.name]) {
      this.inventory[item.name] = {
        count: 0,
        texture: item.sprite.texture.key,
      }
    }
    this.inventory[item.name].count++
    GameUI.instance.inventoryMenu.updateInventoryMenu(
      this.inventory,
      (itemName: string, itemBox: ItemBox) => this.handleItemClick(itemName)
    )
  }

  handleHoverItem(item: Item) {
    this.itemOnHover = item
  }

  handleUnhoverItem() {
    this.itemOnHover = null
  }

  handleItemClick(itemName: string) {
    console.log('Clicked item!', itemName)
  }
}
