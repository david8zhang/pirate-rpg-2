import Phaser from 'phaser'

export const createPlayerAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'player-base-idle-front',
    frames: anims.generateFrameNames('player-base', {
      start: 0,
      end: 3,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-idle-front',
    frames: anims.generateFrameNames('player-arms', {
      start: 0,
      end: 3,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })
}
