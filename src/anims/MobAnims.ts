import { MobConfig, MobConstants } from '~/utils/configs/mobs'

export const createMobAnims = (anims: Phaser.Animations.AnimationManager) => {
  MobConstants.ALL_CONFIGS.forEach((config: MobConfig) => {
    const animations = config.animations
    animations?.forEach((animation) => {
      anims.create({
        key: animation.key,
        frames: anims.generateFrameNames(config.name, {
          ...animation.frames,
        }),
        repeat: animation.repeat,
        frameRate: animation.frameRate,
      })
    })
  })
}
