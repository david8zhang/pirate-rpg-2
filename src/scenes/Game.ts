import Phaser from 'phaser'
import { Player } from '~/core/Player'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { SpeechBox } from '~/core/SpeechBox'
import { NPC } from '~/core/NPC'
import { Map } from '~/core/Map'
import { Constants } from '~/utils/Constants'

export default class Game extends Phaser.Scene {
  public player!: Player
  public map!: Map

  constructor() {
    super('game')
  }

  create() {
    this.player = new Player(this, {
      position: { x: 100, y: 100 },
      scale: { x: 0.3, y: 0.3 },
    })

    this.cameras.main.startFollow(this.player.sprite, true)
    this.cameras.main.setBounds(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT)

    this.map = new Map(this, {
      tileMapKey: 'map1',
      npcConfig: {
        John: {
          dialog: 'Hello world!',
          texture: 'npc',
        },
      },
    })
  }

  update() {
    this.player.update()
  }
}
