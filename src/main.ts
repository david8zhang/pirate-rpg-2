import Phaser from 'phaser'

import Game from './scenes/Game'
import Preload from './scenes/Preload'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles'
import { Constants } from './utils/Constants'
import { GameUI } from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: Constants.SCREEN_WIDTH,
  height: Constants.SCREEN_HEIGHT,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Game, GameUI],
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
}

export default new Phaser.Game(config)
