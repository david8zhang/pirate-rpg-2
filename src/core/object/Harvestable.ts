import Game from '~/scenes/Game'
import { HarvestableConfig } from '~/utils/configs/harvestables'
import { ITEM_CONFIGS } from '~/utils/configs/items'
import { Item } from './Item'

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
    this.config.dropItems.forEach((dropItemConfig) => {
      const xDiff = dropItemConfig.relativePosition ? dropItemConfig.relativePosition.x : 0
      const yDiff = dropItemConfig.relativePosition ? dropItemConfig.relativePosition.y : 0
      const detailedItemConfig = ITEM_CONFIGS[dropItemConfig.itemType]
      const newItem = new Item(this.game, {
        ...detailedItemConfig,
        name: dropItemConfig.itemType,
        position: {
          x: this.sprite.x + xDiff,
          y: this.sprite.y + yDiff,
        },
      })
      this.game.addItem(newItem)
      newItem.drop()
    })
  }
}
