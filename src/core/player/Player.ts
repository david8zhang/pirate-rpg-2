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
import { Constants, EntityConfig } from '~/utils/Constants'
import { Item } from '../object/Item'
import { InventoryManager } from './managers/InventoryManager'
import { WeaponTypes, WEAPON_CONFIGS } from '~/utils/configs/weapons'
import { PlayerStates } from './states/PlayerStates'

export class Player {
  public game: Game
  public stateMachine: StateMachine
  public onUpdateHooks: Function[] = []

  // Store states
  public equipmentManager!: EquipmentManager
  public spriteManager!: SpriteManager
  public inventoryManager!: InventoryManager

  // Writes states, or mutates state in some way
  public moveController!: MoveController
  public animController!: AnimationController
  public attackController!: AttackController
  public colliderController!: ColliderController

  // Item on hover
  public itemOnHover: Item | null = null

  constructor(game: Game, config: EntityConfig) {
    this.game = game
    this.setupManagers(game, config)
    this.setupControllers(game, config)
    this.stateMachine = new StateMachine(
      PlayerStates.IDLE,
      {
        [PlayerStates.IDLE]: new IdleState(),
        [PlayerStates.MOVE]: new MoveState(),
        [PlayerStates.ATTACK]: new AttackState(),
      },
      [this]
    )
    this.getBaseSprite().setData('ref', this)
    this.setupWeapon()
  }

  setupWeapon() {
    this.equipmentManager.setupWeapon(WEAPON_CONFIGS[WeaponTypes.STONE_AXE])
    this.colliderController.addObjectToAttackHitboxGroup(this.equipmentManager.weapon!.hitboxImage)
    this.colliderController.deactivateAttackHitbox()
  }

  setupManagers(game: Game, config: EntityConfig) {
    this.spriteManager = new SpriteManager({
      config,
      game,
    })
    this.equipmentManager = new EquipmentManager({
      player: this,
      game,
    })
    this.inventoryManager = new InventoryManager({
      player: this,
      game,
    })
  }

  setupControllers(game: Game, config: EntityConfig) {
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

  playWeaponAttackAnimation() {
    if (this.equipmentManager.weapon) {
      this.equipmentManager.weapon.playAttackAnimation()
    }
  }

  isArmed() {
    return this.equipmentManager.weapon != null
  }

  public registerOnUpdateHook(fn: Function) {
    this.onUpdateHooks.push(fn)
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
    return this.colliderController.attackGroup
  }

  update() {
    this.stateMachine.step()
    this.onUpdateHooks.forEach((fn) => {
      fn()
    })
  }

  getDirection() {
    return this.moveController.currDirection
  }

  getCurrState() {
    return this.stateMachine.getState()
  }

  getSprites() {
    const sprites = [...this.spriteManager.sprites]
    if (this.equipmentManager.weapon) {
      sprites.push(this.equipmentManager.weapon.sprite)
    }
    return sprites
  }

  get damage() {
    if (this.equipmentManager.weapon) {
      return this.equipmentManager.weapon.damage
    }
    return Constants.UNARMED_DAMAGE
  }

  getBaseSprite() {
    return this.spriteManager.getSpriteByName('player-base')
  }

  addEquipment(armorType: ArmorType, armorPiece: ArmorPiece) {
    this.equipmentManager.setArmorPiece(armorType, armorPiece)
    this.spriteManager.setSpriteTextureForKey(armorType, armorPiece.animKey)
  }

  handleHoverItem(item: Item) {
    this.inventoryManager.handleHoverItem(item)
  }

  handleUnhoverItem() {
    this.inventoryManager.handleUnhoverItem()
  }

  public stop() {
    this.moveController.stop()
  }
}
