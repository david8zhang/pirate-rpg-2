import Phaser from 'phaser'

export const createPlayerBaseAnims = (anims: Phaser.Animations.AnimationManager) => {
  // Idle animations
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
    key: 'player-base-idle-back',
    frames: anims.generateFrameNames('player-base', {
      start: 12,
      end: 15,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-idle-side',
    frames: anims.generateFrameNames('player-base', {
      start: 16,
      end: 19,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Walk animations
  anims.create({
    key: 'player-base-walk-front',
    frames: anims.generateFrameNames('player-base', {
      start: 4,
      end: 7,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-walk-back',
    frames: anims.generateFrameNames('player-base', {
      start: 8,
      end: 11,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-walk-side',
    frames: anims.generateFrameNames('player-base', {
      start: 20,
      end: 23,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Swipe animations
  anims.create({
    key: 'player-base-swipe-side',
    frames: anims.generateFrameNames('player-base', {
      start: 32,
      end: 35,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-swipe-front',
    frames: anims.generateFrameNames('player-base', {
      start: 24,
      end: 27,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-swipe-back',
    frames: anims.generateFrameNames('player-base', {
      start: 28,
      end: 31,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Punch animations
  anims.create({
    key: 'player-base-punch-front',
    frames: anims.generateFrameNames('player-base', {
      start: 36,
      end: 39,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-base-punch-side',
    frames: anims.generateFrameNames('player-base', {
      start: 40,
      end: 43,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })
}

export const createPlayerArmsAnims = (anims: Phaser.Animations.AnimationManager) => {
  // Idle Animations
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

  anims.create({
    key: 'player-arms-idle-back',
    frames: anims.generateFrameNames('player-arms', {
      start: 12,
      end: 15,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-idle-side',
    frames: anims.generateFrameNames('player-arms', {
      start: 16,
      end: 19,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Walk animations
  anims.create({
    key: 'player-arms-walk-front',
    frames: anims.generateFrameNames('player-arms', {
      start: 4,
      end: 7,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-walk-back',
    frames: anims.generateFrameNames('player-arms', {
      start: 8,
      end: 11,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-walk-side',
    frames: anims.generateFrameNames('player-arms', {
      start: 20,
      end: 23,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Swipe animations
  anims.create({
    key: 'player-arms-swipe-side',
    frames: anims.generateFrameNames('player-arms', {
      start: 32,
      end: 35,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-swipe-front',
    frames: anims.generateFrameNames('player-arms', {
      start: 24,
      end: 27,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-swipe-back',
    frames: anims.generateFrameNames('player-arms', {
      start: 28,
      end: 31,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Punch animations
  anims.create({
    key: 'player-arms-punch-front',
    frames: anims.generateFrameNames('player-arms', {
      start: 36,
      end: 39,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: 'player-arms-punch-side',
    frames: anims.generateFrameNames('player-arms', {
      start: 40,
      end: 43,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })
}
