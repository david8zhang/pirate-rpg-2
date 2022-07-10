import { EntityConfig } from '../Constants'

export interface MobConfig extends EntityConfig {
  name: string
  animations?: {
    key: string
    frames: { start: number; end: number; suffix: string }
    repeat: number
    frameRate: number
  }[]
}

export const CRAB_CONFIG: MobConfig = {
  name: 'crab',
  health: 50,
  speed: 200,
  position: {
    x: 0,
    y: 0,
  },
  spriteMapping: {
    BASE: 'crab',
  },
  scale: {
    x: 1,
    y: 1,
  },
  body: {
    height: 10,
    width: 15,
    offsetY: 2,
  },
  animations: [
    {
      key: 'crab-idle-front',
      frames: {
        start: 0,
        end: 2,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-walk-front',
      frames: {
        start: 4,
        end: 6,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-idle-back',
      frames: {
        start: 0,
        end: 2,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-walk-back',
      frames: {
        start: 4,
        end: 6,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-walk-side',
      frames: {
        start: 14,
        end: 16,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-idle-side',
      frames: {
        start: 10,
        end: 12,
        suffix: '.png',
      },
      repeat: -1,
      frameRate: 10,
    },
    {
      key: 'crab-hurt-front',
      frames: {
        start: 8,
        end: 8,
        suffix: '.png',
      },
      repeat: 0,
      frameRate: 10,
    },
    {
      key: 'crab-die-front',
      frames: {
        start: 7,
        end: 9,
        suffix: '.png',
      },
      repeat: 0,
      frameRate: 5,
    },
    {
      key: 'crab-hurt-back',
      frames: {
        start: 8,
        end: 8,
        suffix: '.png',
      },
      repeat: 0,
      frameRate: 10,
    },
    {
      key: 'crab-die-back',
      frames: {
        start: 7,
        end: 9,
        suffix: '.png',
      },
      repeat: 0,
      frameRate: 5,
    },
    {
      key: 'crab-die-side',
      frames: {
        start: 16,
        end: 18,
        suffix: '.png',
      },
      repeat: 0,
      frameRate: 5,
    },
  ],
}

export class MobConstants {
  public static ALL_CONFIGS = [CRAB_CONFIG]
}
