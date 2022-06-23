import Phaser from 'phaser'
import { Player } from '../core/player/Player'
import { Map } from '~/core/map/Map'
import { Constants } from '~/utils/Constants'
import { createPlayerArmsAnims, createPlayerBaseAnims } from '~/anims/PlayerAnims'

export default class Game extends Phaser.Scene {
  public player!: Player
  public map!: Map
  public animatedTiles: any

  constructor() {
    super('game')
  }

  preload() {
    this.load.scenePlugin(
      'AnimatedTiles',
      'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
      'animatedTiles',
      'animatedTiles'
    )
  }

  create() {
    createPlayerBaseAnims(this.anims)
    createPlayerArmsAnims(this.anims)
    this.initTilemap()
    this.initPlayer()
  }

  initTilemap() {
    this.map = new Map(this, {
      tileMapKey: 'intro-island',
    })
  }

  initPlayer() {
    if (this.map) {
      const spawnLayer = this.map.tileMap.getObjectLayer('Spawn')
      const spawnPoint = spawnLayer.objects.find((object) => object.name === 'spawn-point')
      if (spawnPoint) {
        this.player = new Player(this, {
          position: {
            x: spawnPoint.x as number,
            y: spawnPoint.y as number,
          },
          scale: { x: 2, y: 2 },
          layersToCollideWith: ['Ocean'],
        })
        this.cameras.main.setBounds(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
      }
    }
  }

  update() {
    this.player.update()
    this.depthSort()
  }

  depthSort() {
    const sortedByY = this.sys.displayList
      .getChildren()
      .filter((child: any) => {
        return child.y
      })
      .sort((a: any, b: any) => {
        return a.y - b.y
      })
    let lowestLayer = 1
    sortedByY.forEach((c: any, index: number) => {
      if (c.setDepth) {
        c.setDepth(lowestLayer + index)
      }
    })
  }
}
