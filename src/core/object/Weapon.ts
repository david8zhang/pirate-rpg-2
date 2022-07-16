import Game from '~/scenes/Game'
import { WeaponConfig } from '~/utils/configs/weapons'
import { Direction } from '~/utils/Constants'
import { Player } from '../player/Player'

export class Weapon {
  private game: Game
  private player: Player
  public sprite: Phaser.Physics.Arcade.Sprite
  private attackEffectSprite: Phaser.GameObjects.Sprite
  public textureSet: any
  public attackRange: number
  public prevPlayerDirection: Direction

  // Hitbox image
  public hitboxImage: Phaser.Physics.Arcade.Image
  public isAttacking: boolean = false

  constructor(config: WeaponConfig, game: Game, player: Player) {
    this.game = game
    this.player = player
    const baseSprite = this.player.getBaseSprite()
    this.sprite = this.game.physics.add.sprite(baseSprite.x, baseSprite.y, '')
    this.attackEffectSprite = this.game.add.sprite(baseSprite.x, baseSprite.y, '')
    this.attackEffectSprite.setVisible(false)
    this.attackEffectSprite.setDepth(1000)
    this.attackEffectSprite.setName('Effect')
    this.sprite.setVisible(false)
    this.sprite.setOrigin(0.5)
    this.textureSet = config.textureSet
    this.attackRange = config.attackRange

    // Initialize weapon hitbox
    this.hitboxImage = this.game.physics.add.image(this.sprite.x, this.sprite.y, '')
    this.hitboxImage.setSize(5, 5)
    this.hitboxImage.setVisible(false)
    this.game.physics.world.enableBody(this.hitboxImage, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.hitboxImage.setPushable(false)
    this.hitboxImage.setDebugBodyColor(0xffff00)

    // Setup weapon position
    this.prevPlayerDirection = this.player.getDirection()
    this.setWeaponPosition()
  }

  setWeaponPosition() {
    const handPosition = this.getPlayerHandPosition()
    this.sprite.setX(handPosition.x)
    this.sprite.setY(handPosition.y)
  }

  show() {
    if (!this.isAttacking) {
      const weaponDepth = this.getWeaponDepth()
      const rotationAngle = this.getWeaponRotationAngle()
      const scaleX = this.getWeaponScaleX()
      const scaleY = this.getWeaponScaleY()

      const currDirection = this.player.getDirection()
      if (currDirection) {
        const currWeaponTexture = this.textureSet[currDirection]
        this.sprite.setTexture(currWeaponTexture)
      }

      if (currDirection !== this.prevPlayerDirection) {
        this.prevPlayerDirection = currDirection
        this.setWeaponPosition()
      }

      this.sprite.setAngle(rotationAngle)
      this.sprite.setDepth(weaponDepth)
      this.sprite.scaleY = scaleY
      this.sprite.scaleX = scaleX
      this.sprite.setVisible(true)
    }
  }

  hide() {
    this.sprite.setVisible(false)
  }

  public activateWeaponHitbox() {
    this.hitboxImage.body.enable = true
    switch (this.player.getDirection()) {
      case Direction.LEFT: {
        this.hitboxImage.setSize(this.sprite.width + 10, this.player.displaySize.height + 20)
        this.hitboxImage.setPosition(
          this.player.position.x - this.attackRange,
          this.player.position.y
        )
        break
      }
      case Direction.RIGHT: {
        this.hitboxImage.setSize(this.sprite.width + 10, this.player.displaySize.height + 20)
        this.hitboxImage.setPosition(
          this.player.position.x + this.attackRange,
          this.player.position.y
        )
        break
      }
      case Direction.UP: {
        this.hitboxImage.setSize(this.player.displaySize.width + 20, this.sprite.height)
        this.hitboxImage.setPosition(
          this.player.position.x,
          this.player.position.y - this.attackRange
        )
        break
      }
      case Direction.DOWN: {
        this.hitboxImage.setSize(this.player.displaySize.width + 20, this.sprite.height)
        this.hitboxImage.setPosition(
          this.player.position.x,
          this.player.position.y + this.attackRange
        )
        break
      }
    }
  }

  playAnimationFrames(frames: any[], frameIndex: number, onCompletedFn: Function) {
    if (frameIndex == frames.length) {
      this.game.time.delayedCall(100, onCompletedFn)
      return
    }
    const frame = frames[frameIndex]
    this.game.time.delayedCall(frame.time, () => {
      const xPos = this.player.position.x + frame.x
      const yPos = this.player.position.y + frame.y
      this.sprite.setAngle(frame.angle)
      this.sprite.setTexture(frame.texture)
      this.sprite.setPosition(xPos, yPos)
      if (frame.onShowFn) {
        frame.onShowFn()
      }
      this.playAnimationFrames(frames, frameIndex + 1, onCompletedFn)
    })
  }

  playAttackAnimation() {
    if (this.isAttacking) {
      return
    }
    this.isAttacking = true
    const sideTexture = this.textureSet[Direction.LEFT]
    const diagTexture = this.textureSet[Direction.DOWN]

    switch (this.player.getDirection()) {
      case Direction.LEFT: {
        this.sprite.scaleY = 1
        this.sprite.scaleX = -1
        this.attackEffectSprite.scaleX = -1
        this.sprite.setAngle(0)
        this.sprite.x = this.player.position.x - 10
        this.sprite.y = this.player.position.y - 10
        const frames = [
          {
            texture: sideTexture,
            x: -10,
            y: -10,
            time: 0,
            angle: 0,
          },
          {
            texture: sideTexture,
            x: -15,
            y: -15,
            time: 75,
            angle: 0,
          },
          {
            texture: diagTexture,
            x: -10,
            y: -10,
            time: 75,
            angle: 0,
          },
          {
            texture: sideTexture,
            x: -10,
            y: 30,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.activateWeaponHitbox()
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-1')
              this.attackEffectSprite.setPosition(this.sprite.x - 15, this.sprite.y - 15)
            },
          },
          {
            texture: sideTexture,
            x: -10,
            y: 35,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-2')
              this.attackEffectSprite.setPosition(this.sprite.x - 15, this.sprite.y - 15)
            },
          },
          {
            texture: sideTexture,
            x: -10,
            y: 35,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(false)
            },
          },
        ]
        this.playAnimationFrames(frames, 0, () => {
          this.isAttacking = false
          this.hitboxImage.body.enable = false
          this.attackEffectSprite.scaleX = 1
          this.setWeaponPosition()
        })
        break
      }
      case Direction.RIGHT: {
        this.sprite.scaleX = 1
        const frames = [
          {
            texture: sideTexture,
            x: 10,
            y: -10,
            time: 0,
            angle: 0,
          },
          {
            texture: sideTexture,
            x: 15,
            y: -15,
            time: 75,
            angle: 0,
          },
          {
            texture: diagTexture,
            x: 10,
            y: -10,
            time: 75,
            angle: 0,
          },
          {
            texture: sideTexture,
            x: 10,
            y: 30,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.activateWeaponHitbox()
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-1')
              this.attackEffectSprite.setPosition(this.sprite.x + 15, this.sprite.y - 15)
            },
          },
          {
            texture: sideTexture,
            x: 10,
            y: 35,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-2')
              this.attackEffectSprite.setPosition(this.sprite.x + 15, this.sprite.y - 15)
            },
          },
          {
            texture: sideTexture,
            x: 10,
            y: 35,
            time: 75,
            angle: 180,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(false)
            },
          },
        ]
        this.playAnimationFrames(frames, 0, () => {
          this.isAttacking = false
          this.hitboxImage.body.enable = false
          this.setWeaponPosition()
        })
        break
      }
      case Direction.DOWN: {
        this.attackEffectSprite.setAngle(90)
        const frames = [
          {
            texture: sideTexture,
            x: 20,
            y: 10,
            time: 0,
            angle: 90,
          },
          {
            texture: sideTexture,
            x: 30,
            y: 5,
            time: 75,
            angle: 90,
          },
          {
            texture: diagTexture,
            x: 20,
            y: 20,
            time: 75,
            angle: 90,
          },
          {
            texture: sideTexture,
            x: -30,
            y: 5,
            time: 75,
            angle: 270,
            onShowFn: () => {
              this.activateWeaponHitbox()
              this.sprite.scaleX = -1
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-1')
              this.attackEffectSprite.setPosition(this.sprite.x + 15, this.sprite.y + 15)
            },
          },
          {
            texture: sideTexture,
            x: -30,
            y: 5,
            time: 75,
            angle: 270,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-2')
              this.attackEffectSprite.setPosition(this.sprite.x + 15, this.sprite.y + 15)
            },
          },
          {
            texture: sideTexture,
            x: -30,
            y: 5,
            time: 75,
            angle: 270,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(false)
              this.attackEffectSprite.setAngle(0)
            },
          },
        ]
        this.playAnimationFrames(frames, 0, () => {
          this.isAttacking = false
          this.hitboxImage.body.enable = false
          this.attackEffectSprite.setAngle(0)
          this.setWeaponPosition()
        })
        break
      }
      case Direction.UP: {
        this.attackEffectSprite.scaleY = -1
        this.attackEffectSprite.scaleX = -1
        this.attackEffectSprite.setAngle(90)
        const frames = [
          {
            texture: sideTexture,
            x: -30,
            y: 5,
            time: 0,
            angle: 270,
          },
          {
            texture: sideTexture,
            x: -35,
            y: 10,
            time: 75,
            angle: 270,
          },
          {
            texture: sideTexture,
            x: -20,
            y: 5,
            time: 75,
            angle: 270,
          },
          {
            texture: sideTexture,
            x: 30,
            y: 10,
            time: 75,
            angle: 90,
            onShowFn: () => {
              this.activateWeaponHitbox()
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-1')
              this.attackEffectSprite.setPosition(this.sprite.x - 30, this.sprite.y - 25)
            },
          },
          {
            texture: sideTexture,
            x: 30,
            y: 10,
            time: 75,
            angle: 90,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(true)
              this.attackEffectSprite.setTexture('slash-2')
              this.attackEffectSprite.setPosition(this.sprite.x - 30, this.sprite.y - 25)
            },
          },
          {
            texture: sideTexture,
            x: 20,
            y: 10,
            time: 75,
            angle: 90,
            onShowFn: () => {
              this.attackEffectSprite.setVisible(false)
              this.attackEffectSprite.setAngle(0)
              this.attackEffectSprite.scaleX = 1
              this.attackEffectSprite.scaleY = 1
            },
          },
        ]
        this.playAnimationFrames(frames, 0, () => {
          this.isAttacking = false
          this.hitboxImage.body.enable = false
          this.setWeaponPosition()
        })
        break
      }
    }
  }

  getWeaponDepth() {
    return this.player.getBaseSprite().depth + 100
  }

  getWeaponScaleY() {
    if (this.player.getDirection() === Direction.LEFT) {
      return -1
    }
    return 1
  }

  getWeaponScaleX() {
    if (this.player.getDirection() === Direction.UP) {
      return -1
    }
    return 1
  }

  getWeaponRotationAngle() {
    switch (this.player.getDirection()) {
      case Direction.RIGHT: {
        return 90
      }
      case Direction.LEFT: {
        return 90
      }
      default:
        return 0
    }
  }

  // Refactor this
  getPlayerHandPosition() {
    const baseSprite = this.player.getBaseSprite() as Phaser.Physics.Arcade.Sprite
    switch (this.player.getDirection()) {
      case Direction.LEFT: {
        return {
          x: baseSprite.x - 16,
          y: baseSprite.y + 10,
        }
      }
      case Direction.RIGHT: {
        return {
          x: baseSprite.x + 16,
          y: baseSprite.y + 13,
        }
      }
      case Direction.UP: {
        return {
          x: baseSprite.x - 8,
          y: baseSprite.y - 2,
        }
      }
      case Direction.DOWN: {
        return {
          x: baseSprite.x + 8,
          y: baseSprite.y - 2,
        }
      }
    }
  }
}
