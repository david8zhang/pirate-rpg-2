import Game from '~/scenes/Game'

interface HarvestableConfig {
  textureKey: string
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
}

export enum HarvestableTypes {
  PALM_TREE = 'Palm Tree',
}

export const HARVESTABLE_CONFIGS = {
  [HarvestableTypes.PALM_TREE]: {
    textureKey: 'palm-tree',
    hitbox: {
      width: 32,
      height: 20,
      yOffset: 50,
    },
    scale: 2,
  },
}

export class Harvestable {
  private game: Game
  private _sprite: Phaser.GameObjects.Sprite
  private hitbox: Phaser.Physics.Arcade.Sprite

  constructor(game: Game, config: HarvestableConfig) {
    this.game = game
    this._sprite = this.game.add
      .sprite(config.position.x, config.position.y, config.textureKey)
      .setScale(config.scale ? config.scale : 1)

    const xOffset = config.hitbox.xOffset ? config.hitbox.xOffset : 0
    const yOffset = config.hitbox.yOffset ? config.hitbox.yOffset : 0
    this.hitbox = this.game.physics.add
      .sprite(config.position.x + xOffset, config.position.y + yOffset, '')
      .setVisible(false)
      .setDisplaySize(config.hitbox.width, config.hitbox.height)
    this.game.physics.world.enableBody(this.hitbox, Phaser.Physics.Arcade.DYNAMIC_BODY)
  }

  public get sprite() {
    return this.hitbox
  }
}
