import Game from '~/scenes/Game'
import { Item, ItemTypes, ITEM_CONFIGS } from './Item'

interface ItemDrop {
  itemType: ItemTypes
  quantity: number
  relativePosition?: {
    y: number
    x: number
  }
}

interface HarvestableConfig {
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
      width: 32,
      height: 20,
      yOffset: 50,
    },
    scale: 2,
    droppedItems: [
      {
        itemType: ItemTypes.COCONUT,
        quantity: 2,
        relativePosition: {
          y: -75,
          x: 0,
        },
      },
    ],
  },
}

export class Harvestable {
  private game: Game
  private _sprite: Phaser.GameObjects.Sprite
  private hitbox: Phaser.Physics.Arcade.Sprite
  public canDrop: boolean = true
  public config: HarvestableConfig

  constructor(game: Game, config: HarvestableConfig) {
    this.game = game
    this._sprite = this.game.add
      .sprite(config.position.x, config.position.y, config.textures.withDrop)
      .setScale(config.scale ? config.scale : 1)
    this.config = config
    const xOffset = config.hitbox.xOffset ? config.hitbox.xOffset : 0
    const yOffset = config.hitbox.yOffset ? config.hitbox.yOffset : 0
    this.hitbox = this.game.physics.add
      .sprite(config.position.x + xOffset, config.position.y + yOffset, '')
      .setVisible(false)
      .setDisplaySize(config.hitbox.width, config.hitbox.height)
    this.game.physics.world.enableBody(this.hitbox, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.sprite.setData('ref', this)
  }

  public get sprite() {
    return this.hitbox
  }

  public takeDamage() {
    if (this.canDrop) {
      if (this.config.textures.withoutDrop) {
        this._sprite.setTexture(this.config.textures.withoutDrop)
      }
      this.canDrop = false
      this.dropItems()
    }
  }

  dropItems() {
    this.config.dropItems.forEach((config) => {
      const xDiff = config.relativePosition ? config.relativePosition.x : 0
      const yDiff = config.relativePosition ? config.relativePosition.y : 0
      const newItem = new Item(this.game, {
        name: config.itemType,
        dropLength: ITEM_CONFIGS[config.itemType].dropLength,
        texture: ITEM_CONFIGS[config.itemType].texture,
        position: {
          x: this.sprite.x + xDiff,
          y: this.sprite.y + yDiff,
        },
        scale: ITEM_CONFIGS[config.itemType].scale,
      })
      this.game.addItem(newItem)
      newItem.drop()
    })
  }
}
