export const createEquipmentAnims = (anims: Phaser.Animations.AnimationManager) => {
  createTemplateAnim(anims, 'red-bandana')
  createTemplateAnim(anims, 'leather-vest')
  createTemplateAnim(anims, 'leather-pants')
}

const createTemplateAnim = (anims: Phaser.Animations.AnimationManager, key: string) => {
  // Idle animations
  anims.create({
    key: `${key}-idle-front`,
    frames: anims.generateFrameNames(key, {
      start: 0,
      end: 3,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  })

  anims.create({
    key: `${key}-idle-back`,
    frames: anims.generateFrameNames(key, {
      start: 12,
      end: 15,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  })

  anims.create({
    key: `${key}-idle-side`,
    frames: anims.generateFrameNames(key, {
      start: 16,
      end: 19,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  })

  // Walk animations
  anims.create({
    key: `${key}-walk-front`,
    frames: anims.generateFrameNames(key, {
      start: 4,
      end: 7,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-walk-back`,
    frames: anims.generateFrameNames(key, {
      start: 8,
      end: 11,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-walk-side`,
    frames: anims.generateFrameNames(key, {
      start: 20,
      end: 23,
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 10,
  })

  // Swipe animations
  anims.create({
    key: `${key}-swipe-side`,
    frames: anims.generateFrameNames(key, {
      start: 32,
      end: 35,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-swipe-front`,
    frames: anims.generateFrameNames(key, {
      start: 24,
      end: 27,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-swipe-back`,
    frames: anims.generateFrameNames(key, {
      start: 28,
      end: 31,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })

  // Punch animations
  anims.create({
    key: `${key}-punch-back`,
    frames: anims.generateFrameNames(key, {
      start: 28,
      end: 31,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-punch-front`,
    frames: anims.generateFrameNames(key, {
      start: 36,
      end: 39,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })

  anims.create({
    key: `${key}-punch-side`,
    frames: anims.generateFrameNames(key, {
      start: 40,
      end: 43,
      suffix: '.png',
    }),
    repeat: 0,
    frameRate: 10,
  })
}
