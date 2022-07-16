import { Weapon } from '~/core/object/Weapon'
import { ItemBox } from '~/core/ui/ItemBox'
import Game from '~/scenes/Game'
import { GameUI } from '~/scenes/GameUI'
import { WeaponConfig } from '~/utils/configs/weapons'
import { Direction } from '~/utils/Constants'
import { Player } from '../Player'

// Add stats later
export interface ArmorPiece {
  animKey: string
  name: string
  inventoryIcon: string
}

export enum ArmorType {
  BASE = 'BASE',
  HEAD = 'HEAD',
  CHEST = 'CHEST',
  LEGS = 'LEGS',
  ARMS = 'ARMS',
}

export interface EquipmentManagerConfig {
  player: Player
  game: Game
}

export class EquipmentManager {
  private player: Player
  private game: Game

  public headArmor?: ArmorPiece
  public chestArmor?: ArmorPiece
  public legArmor?: ArmorPiece
  public armArmor?: ArmorPiece
  public weapon: Weapon | null = null

  constructor(config: EquipmentManagerConfig) {
    const { player, game } = config
    this.player = player
    this.game = game
    this.player.registerOnUpdateHook(() => {
      this.update()
    })
    this.game.input.keyboard.on('keydown', (keycode: any) => {
      if (keycode.code === 'KeyC') {
        GameUI.instance.equipMenu.toggleVisible()
      }
    })
  }

  public setArmorPiece(key: ArmorType, armorPiece: ArmorPiece) {
    let itemBoxToUpdate: ItemBox | null = null
    switch (key) {
      case ArmorType.ARMS: {
        itemBoxToUpdate = GameUI.instance.equipMenu.armsBox
        this.armArmor = armorPiece
        break
      }
      case ArmorType.CHEST: {
        itemBoxToUpdate = GameUI.instance.equipMenu.chestBox
        this.chestArmor = armorPiece
        break
      }
      case ArmorType.HEAD: {
        itemBoxToUpdate = GameUI.instance.equipMenu.headBox
        this.headArmor = armorPiece
        break
      }
      case ArmorType.LEGS: {
        itemBoxToUpdate = GameUI.instance.equipMenu.pantsBox
        this.legArmor = armorPiece
        break
      }
    }
    if (itemBoxToUpdate) {
      itemBoxToUpdate.setItem(1, armorPiece.name, armorPiece.inventoryIcon)
    }
  }

  public setupWeapon(config: WeaponConfig) {
    this.weapon = new Weapon(config, this.game, this.player)
    GameUI.instance.equipMenu.weaponBox.setItem(1, config.name, config.inventoryIcon)
    this.weapon.show()
  }

  public update() {
    if (this.weapon) {
      this.weapon.show()
    }
  }
}
