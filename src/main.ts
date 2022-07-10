import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'

import Game from './scenes/Game'
import Preload from './scenes/Preload'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { Constants } from './utils/Constants'
import { GameUI } from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
  antialias: false,
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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Game, GameUI],
  plugins: {
    global: [NineSlicePlugin.DefaultCfg],
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
