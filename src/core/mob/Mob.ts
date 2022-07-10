import Game from '~/scenes/Game'
import { MobConfig } from '~/utils/configs/mobs'
import { Direction } from '~/utils/Constants'
import { AnimationController } from '../player/controllers/AnimationController'
import { ColliderController } from '../player/controllers/ColliderController'
import { SpriteManager } from '../player/managers/SpriteManager'
import { StateMachine } from '../StateMachine'
import { MobColliderController } from './controllers/MobColliderController'
import { MobMoveController } from './controllers/MobMoveController'
import { IdleState } from './states/IdleState'

export class Mob {
  private game: Game
  public spriteManager!: SpriteManager
  public animController!: AnimationController
  public moveController!: MobMoveController
  public colliderController!: MobColliderController
  public stateMachine: StateMachine

  constructor(game: Game, config: MobConfig) {
    this.game = game
    this.setupManagers(game, config)
    this.setupControllers(game, config)
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
      },
      [this]
    )
    this.getBaseSprite().setData('ref', this)
  }

  setupManagers(game: Game, config: MobConfig) {
    this.spriteManager = new SpriteManager({ game, config })
  }

  setupControllers(game: Game, config: MobConfig) {
    this.animController = new AnimationController({
      sprites: this.spriteManager.sprites,
    })
    this.moveController = new MobMoveController({
      game,
      config,
      mob: this,
    })
    this.colliderController = new MobColliderController({
      game,
      mob: this,
      mobConfig: config,
    })
  }

  getCenterPosition() {
    const baseSprite = this.getBaseSprite()
    return {
      x: baseSprite.x,
      y: baseSprite.y,
    }
  }

  getBaseSprite() {
    return this.spriteManager.spriteMapping['BASE']
  }

  getDirection(): Direction | null {
    return this.moveController.currDirection
  }

  getSprites() {
    return this.spriteManager.sprites
  }

  update() {
    this.stateMachine.step()
  }
}
