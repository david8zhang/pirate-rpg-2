import Game from '~/scenes/Game'
import { MoveController } from './controllers/MoveController'
import { StateMachine } from '../StateMachine'
import { IdleState } from './states/IdleState'
import { MoveState } from './states/MoveState'
import { AnimationController } from './controllers/AnimationController'
import { AttackController } from './controllers/AttackController'
import { AttackState } from './states/AttackState'
import { ArmorPiece, ArmorType, EquipmentManager } from './managers/EquipmentManager'
import { SpriteManager } from './managers/SpriteManager'
import { ColliderController } from './controllers/ColliderController'
import { EntityConfig } from '~/utils/Constants'

export class Player {
  public game: Game
  public stateMachine: StateMachine

  // Store states
  public equipmentManager!: EquipmentManager
  public spriteManager!: SpriteManager

  // Writes states, or mutates state in some way
  public moveController!: MoveController
  public animController!: AnimationController
  public attackController!: AttackController
  public colliderController!: ColliderController

  constructor(game: Game, config: EntityConfig) {
    this.game = game
    this.setupManagers(game, config)
    this.setupControllers(game, config)
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
        move: new MoveState(),
        attack: new AttackState(),
      },
      [this]
    )
    this.getBaseSprite().setData('ref', this)
  }

  setupManagers(game: Game, config: EntityConfig) {
    this.equipmentManager = new EquipmentManager({
      player: this,
      game,
    })
    this.spriteManager = new SpriteManager({
      config,
      game,
    })
  }

  setupControllers(game: Game, config: EntityConfig) {
    this.equipmentManager = new EquipmentManager({
      player: this,
      game,
    })
    this.animController = new AnimationController({
      sprites: this.spriteManager.sprites,
    })
    this.colliderController = new ColliderController({
      player: this,
      game,
      playerConfig: config,
    })
    this.moveController = new MoveController({
      player: this,
      game,
    })
    this.attackController = new AttackController({
      player: this,
      game,
    })
  }

  get position() {
    const baseSprite = this.spriteManager.getSpriteByName('player-base')
    return {
      x: baseSprite?.x,
      y: baseSprite?.y,
    }
  }

  get displaySize() {
    const baseSprite = this.spriteManager.getSpriteByName(
      'player-base'
    ) as Phaser.Physics.Arcade.Sprite
    return {
      width: baseSprite.displayWidth,
      height: baseSprite.displayHeight,
    }
  }

  get attackHitbox() {
    return this.colliderController.attackHitbox
  }

  update() {
    this.stateMachine.step()
  }

  getDirection() {
    return this.moveController.currDirection
  }

  getCurrState() {
    return this.stateMachine.getState()
  }

  getSprites() {
    return this.spriteManager.sprites
  }

  getBaseSprite() {
    return this.spriteManager.getSpriteByName('player-base')
  }

  addEquipment(armorType: ArmorType, armorPiece: ArmorPiece) {
    this.equipmentManager.setArmorPiece(armorType, armorPiece)
    this.spriteManager.setSpriteTextureForKey(armorType, armorPiece.animKey)
  }

  public stop() {
    this.moveController.stop()
  }
}
