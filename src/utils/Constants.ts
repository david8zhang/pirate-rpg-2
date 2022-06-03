export class Constants {
  public static PLAYER_SPEED = 200
  public static SCREEN_WIDTH = 1200
  public static SCREEN_HEIGHT = 900

  public static MAP_WIDTH = 50
  public static MAP_HEIGHT = 50
  public static TILE_SIZE = 16
  public static LAYER_SCALE = 2

  public static GAME_WIDTH = Constants.TILE_SIZE * Constants.MAP_WIDTH * Constants.LAYER_SCALE
  public static GAME_HEIGHT = Constants.TILE_SIZE * Constants.MAP_HEIGHT * Constants.LAYER_SCALE

  public static NPC_CHAT_THRESHOLD = 100
}
