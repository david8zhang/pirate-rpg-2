import { ColliderControllerInterface } from '~/core/player/controllers/ColliderController'
import Game from '~/scenes/Game'
import { MobConfig } from '~/utils/configs/mobs'
import { EntityConfig } from '~/utils/Constants'
import { Mob } from '../Mob'

export interface MobColliderControllerConfig {
  mob: Mob
  game: Game
  mobConfig: MobConfig
}

export class MobColliderController implements ColliderControllerInterface {
  public mob: Mob
  public game: Game

  constructor(config: MobColliderControllerConfig) {
    const { mob, game, mobConfig } = config
    this.mob = mob
    this.game = game
    this.configureBodySize(mobConfig.body)
  }

  setupLayerColliders(config: MobConfig) {
    const { layersToCollideWith } = config
    if (layersToCollideWith) {
      layersToCollideWith.forEach((layer: string) => {
        const layerToCollideWith = this.game.map.getLayer(layer)
        const sprites = this.mob.getSprites()
        if (sprites) {
          sprites.forEach((sprite) => {
            this.game.physics.add.collider(layerToCollideWith, sprite)
          })
        }
      })
    }
  }
  configureBodySize(body: { width: number; height: number; offsetX?: number; offsetY?: number }) {
    const sprites = this.mob.getSprites()
    sprites.forEach((sprite) => {
      sprite.body.setSize(body.width, body.height)
      if (body.offsetY) {
        sprite.body.offset.y += body.offsetY
      }
      if (body.offsetX) {
        sprite.body.offset.x += body.offsetX
      }
    })
  }
}
