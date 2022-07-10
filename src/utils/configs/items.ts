export interface ItemConfig {
  name: string
  dropLength: number
  texture: string
  position: {
    x: number
    y: number
  }
  description: string
  scale: number
}

export enum ItemTypes {
  COCONUT = 'Coconut',
}

export const ITEM_CONFIGS = {
  [ItemTypes.COCONUT]: {
    name: ItemTypes.COCONUT,
    dropLength: 650,
    texture: 'coconut',
    scale: 1,
    description: 'A tasty coconut. Heals 20 HP',
  },
}
