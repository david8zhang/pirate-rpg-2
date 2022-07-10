import { HarvestableTypes } from './configs/harvestables'

export enum Direction {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  UP = 'UP',
}

export interface GameConfig {
  npcConfig?: {
    [name: string]: {
      dialog: string
      texture: string
    }
  }
  harvestableConfig?: {
    harvestableType: HarvestableTypes
    position: { x: number; y: number }
  }[]
}

export interface EntityConfig {
  health: number
  speed: number
  position: {
    x: number
    y: number
  }
  scale: {
    x: number
    y: number
  }
  body: {
    width: number
    height: number
    offsetX?: number
    offsetY?: number
  }
  layersToCollideWith?: string[]
  spriteMapping: {
    [key: string]: string
  }
}

export class Constants {
  public static GAME_CONFIG: GameConfig = {
    harvestableConfig: [
      {
        harvestableType: HarvestableTypes.PALM_TREE,
        position: { x: 1500, y: 1500 },
      },
    ],
  }
  public static SCREEN_WIDTH = 900
  public static SCREEN_HEIGHT = 600

  public static MAP_WIDTH = 100
  public static MAP_HEIGHT = 100
  public static TILE_SIZE = 32
  public static LAYER_SCALE = 1

  public static GAME_WIDTH = Constants.TILE_SIZE * Constants.MAP_WIDTH * Constants.LAYER_SCALE
  public static GAME_HEIGHT = Constants.TILE_SIZE * Constants.MAP_HEIGHT * Constants.LAYER_SCALE

  public static NPC_CHAT_THRESHOLD = 100
  public static getAnimationDirection(direction: Direction) {
    switch (direction) {
      case Direction.LEFT:
      case Direction.RIGHT: {
        return 'side'
      }
      case Direction.UP: {
        return 'back'
      }
      case Direction.DOWN: {
        return 'front'
      }
    }
  }
}
