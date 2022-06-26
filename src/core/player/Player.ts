import Game from '~/scenes/Game'
import { MoveController } from './MoveController'
import { StateMachine } from '../StateMachine'
import { IdleState } from './states/IdleState'
import { MoveState } from './states/MoveState'
import { AnimationController } from './AnimationController'
import { AttackController } from './AttackController'
import { AttackState } from './states/AttackState'
import { ArmorPiece, ArmorType, EquipmentManager } from './EquipmentManager'
import { ColliderController } from './ColliderController'

export interface PlayerConfig {
  position: {
    x: number
    y: number
  }
  scale: {
    x: number
    y: number
  }
  body: {
    x: number
    y: number
  }
  layersToCollideWith?: string[]
}

export class Player {
  private game: Game
  public stateMachine: StateMachine
  public moveController!: MoveController
  public animController!: AnimationController
  public attackController!: AttackController
  public equipmentManager!: EquipmentManager
  public colliderController!: ColliderController

  constructor(game: Game, config: PlayerConfig) {
    this.game = game
    this.setupManagers(game, config)
    this.stateMachine = new StateMachine(
      'idle',
      {
        idle: new IdleState(),
        move: new MoveState(),
        attack: new AttackState(),
      },
      [this]
    )
  }

  addEquipment(armorType: ArmorType, armorPiece: ArmorPiece) {
    this.equipmentManager.setArmorPiece(armorType, armorPiece)
    this.animController.setSpriteTextureForKey(armorType, armorPiece.animKey)
  }

  setupManagers(game: Game, config: PlayerConfig) {
    this.equipmentManager = new EquipmentManager({
      player: this,
      game,
    })
    this.animController = new AnimationController({
      playerConfig: config,
      game,
      player: this,
    })
    this.attackController = new AttackController({
      player: this,
      game,
    })
    this.moveController = new MoveController({
      player: this,
      game,
    })
    this.colliderController = new ColliderController({
      player: this,
      game,
      playerConfig: config,
      colliderConfig: {
        width: 32,
        height: 32,
      },
    })
  }

  get position() {
    const baseSprite = this.animController.getSpriteByName('player-base')
    return {
      x: baseSprite?.x,
      y: baseSprite?.y,
    }
  }

  update() {
    this.stateMachine.step()
  }

  public stop() {
    this.moveController.stop()
  }

  getDirection() {
    return this.moveController.currDirection
  }

  getCurrState() {
    return this.stateMachine.getState()
  }

  getSpriteMapping() {
    return {
      [ArmorType.BASE]: 'player-base',
      [ArmorType.ARMS]: this.equipmentManager.armArmor
        ? this.equipmentManager.armArmor.animKey
        : 'player-arms',
      [ArmorType.LEGS]: this.equipmentManager.legArmor
        ? this.equipmentManager.legArmor.animKey
        : '',
      [ArmorType.HEAD]: this.equipmentManager.headArmor
        ? this.equipmentManager.headArmor.animKey
        : '',
      [ArmorType.CHEST]: this.equipmentManager.chestArmor
        ? this.equipmentManager.chestArmor.animKey
        : '',
    }
  }

  getBaseKey() {
    return ArmorType.BASE
  }

  getSprites() {
    return this.animController.sprites
  }
}
