import Game from '~/scenes/Game'
import { Player } from './Player'

// Add stats later
export interface ArmorPiece {
  animKey: string
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

  constructor(config: EquipmentManagerConfig) {
    const { player, game } = config
    this.player = player
    this.game = game
  }

  public setArmorPiece(key: ArmorType, armorPiece: ArmorPiece) {
    switch (key) {
      case ArmorType.ARMS: {
        this.armArmor = armorPiece
        break
      }
      case ArmorType.CHEST: {
        this.chestArmor = armorPiece
        break
      }
      case ArmorType.HEAD: {
        this.headArmor = armorPiece
        break
      }
      case ArmorType.LEGS: {
        this.legArmor = armorPiece
        break
      }
    }
  }
}
