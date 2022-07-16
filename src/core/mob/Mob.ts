import Game from '~/scenes/Game'
import { GameUI } from '~/scenes/GameUI'
import { MobConfig } from '~/utils/configs/mobs'
import { Constants, Direction } from '~/utils/Constants'
import { AnimationController } from '../player/controllers/AnimationController'
import { SpriteManager } from '../player/managers/SpriteManager'
import { StateMachine } from '../StateMachine'
import { HealthBar } from '../ui/HealthBar'
import { UINumber } from '../ui/UINumber'
import { MobColliderController } from './controllers/MobColliderController'
import { MobMoveController } from './controllers/MobMoveController'
import { DeathState } from './states/DeathState'
import { IdleState } from './states/IdleState'
import { MobStates } from './states/MobStates'

export class Mob {
  private game: Game
  public name: string
  public spriteManager!: SpriteManager
  public animController!: AnimationController
  public moveController!: MobMoveController
  public colliderController!: MobColliderController
  public stateMachine: StateMachine

  // Health
  public healthBar!: HealthBar
  public maxHealth!: number
  public health!: number

  public isHit: boolean = false

  constructor(game: Game, config: MobConfig) {
    this.game = game
    this.name = config.name
    this.setupManagers(game, config)
    this.setupControllers(game, config)
    this.stateMachine = new StateMachine(
      [MobStates.IDLE],
      {
        [MobStates.IDLE]: new IdleState(),
        [MobStates.DEATH]: new DeathState(),
      },
      [this]
    )
    this.getBaseSprite().setData('ref', this)
    this.configureHealthBar(config)
  }

  configureHealthBar(config: MobConfig) {
    this.maxHealth = config.health
    this.health = this.maxHealth
    const sprite = this.getBaseSprite()
    const healthBarWidth = sprite.width * 1.5
    const healthBarConfig = {
      x: sprite.x - healthBarWidth / 2,
      y: sprite.y - sprite.height,
      width: healthBarWidth,
      height: 3,
      maxValue: this.maxHealth,
      fillColor: 0x00ff00,
      showBorder: false,
      borderWidth: 0,
    }
    this.healthBar = new HealthBar(this.game, healthBarConfig)
    this.healthBar.setVisible(false)
  }

  onHit(damage: number) {
    const sprite = this.getBaseSprite()
    if (!this.isHit) {
      this.game.cameras.main.shake(100, 0.005)
      this.isHit = true
      this.takeDamage(damage)
      // this.playHurtAnimBasedOnDirection()
      if (this.health === 0) {
        this.die()
      } else {
        sprite.setTint(0xff0000)
        this.game.time.delayedCall(Constants.ATTACK_DURATION, () => {
          this.isHit = false
          sprite.setTint(0xffffff)
        })
      }
    }
  }

  die(): void {
    this.stateMachine.transition(MobStates.DEATH)
  }

  takeDamage(damage: number) {
    const sprite = this.getBaseSprite()
    this.health -= damage
    this.health = Math.max(0, this.health)
    this.healthBar.decrease(damage)
    this.healthBar.setVisible(true)
    UINumber.createNumber(`-${damage}`, this.game, sprite.x, sprite.y - 10)
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

  getBaseSprite() {
    return this.spriteManager.spriteMapping['BASE']
  }

  getDirection(): Direction {
    return this.moveController.currDirection
  }

  getSprites() {
    return this.spriteManager.sprites
  }

  update() {
    this.stateMachine.step()
  }

  destroy() {
    this.spriteManager.destroy()
    this.healthBar.destroy()
  }
}
