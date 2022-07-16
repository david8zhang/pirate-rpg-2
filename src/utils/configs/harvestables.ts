import { ItemTypes } from './items'

export interface ItemDrop {
  itemType: ItemTypes
  quantity: number
  relativePosition?: {
    y: number
    x: number
  }
}

export interface HarvestableConfig {
  textures: {
    withDrop: string
    withoutDrop: string
  }
  position: {
    x: number
    y: number
  }
  hitbox: {
    width: number
    height: number
    xOffset?: number
    yOffset?: number
  }
  scale?: number
  dropItems: ItemDrop[]
}

export enum HarvestableTypes {
  PALM_TREE = 'Palm Tree',
}

export const HARVESTABLE_CONFIGS = {
  [HarvestableTypes.PALM_TREE]: {
    textures: {
      withDrop: 'palm-tree_with_coconut',
      withoutDrop: 'palm-tree_without_coconut',
    },
    hitbox: {
      width: 15,
      height: 10,
      yOffset: 22,
    },
    scale: 1,
    dropItems: [
      {
        itemType: ItemTypes.COCONUT,
        quantity: 2,
        relativePosition: {
          y: -50,
          x: 0,
        },
      },
    ],
  },
}
