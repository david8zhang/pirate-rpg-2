import { Direction } from '../Constants'

export enum WeaponTypes {
  STONE_AXE = 'STONE_AXE',
}

export interface WeaponConfig {
  name: string
  textureSet: {
    [key: string]: string
  }
  inventoryIcon: string
  damage: number
  attackRange: number
}

export const WEAPON_CONFIGS = {
  [WeaponTypes.STONE_AXE]: {
    name: 'Stone Axe',
    inventoryIcon: 'stone-axe-icon',
    textureSet: {
      [Direction.UP]: 'stone-axe-diag',
      [Direction.DOWN]: 'stone-axe-diag',
      [Direction.LEFT]: 'stone-axe',
      [Direction.RIGHT]: 'stone-axe',
    },
    damage: 15,
    attackRange: 20,
  },
}
