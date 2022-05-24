import Phaser from 'phaser'
import { Player } from '~/core/Player'

export default class Game extends Phaser.Scene {
  private player!: Player
  constructor() {
    super('game')
  }

  create() {
    this.player = new Player(this, {
      position: { x: 100, y: 100 },
      scale: { x: 0.3, y: 0.3 },
    })
  }

  update() {
    this.player.update()
  }
}
