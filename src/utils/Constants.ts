import { HarvestableTypes } from '~/core/Harvestable'
import { Direction } from '~/core/player/controllers/MoveController'

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

export class Constants {
  public static GAME_CONFIG: GameConfig = {
    harvestableConfig: [
      {
        harvestableType: HarvestableTypes.PALM_TREE,
        position: { x: 1500, y: 1500 },
      },
    ],
  }

  public static PLAYER_SPEED = 200
  public static SCREEN_WIDTH = 1200
  public static SCREEN_HEIGHT = 900

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
