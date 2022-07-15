import { Weapon } from '~/core/object/Weapon'
import Game from '~/scenes/Game'
import { Direction } from '~/utils/Constants'
import { Player } from '../Player'

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
  public weapon: Weapon | null = null

  constructor(config: EquipmentManagerConfig) {
    const { player, game } = config
    this.player = player
    this.game = game
    this.player.registerOnUpdateHook(() => {
      this.update()
    })
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

  public setupWeapon() {
    this.weapon = new Weapon({
      name: 'Stone Axe',
      game: this.game,
      player: this.player,
      textureSet: {
        [Direction.UP]: 'stone-axe-diag',
        [Direction.DOWN]: 'stone-axe-diag',
        [Direction.LEFT]: 'stone-axe',
        [Direction.RIGHT]: 'stone-axe',
      },
      damage: 15,
      attackRange: 20,
    })
    this.weapon.show()
  }

  public update() {
    if (this.weapon) {
      this.weapon.show()
    }
  }
}
