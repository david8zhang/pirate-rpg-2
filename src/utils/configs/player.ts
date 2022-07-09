import { ArmorType } from '~/core/player/managers/EquipmentManager'
import { EntityConfig } from '../Constants'

export const PLAYER_CONFIG: EntityConfig = {
  health: 100,
  speed: 200,
  position: {
    x: 0,
    y: 0,
  },
  scale: { x: 2, y: 2 },
  body: {
    width: 10,
    height: 10,
    offsetY: 12,
  },
  spriteMapping: {
    [ArmorType.BASE]: 'player-base',
    [ArmorType.ARMS]: 'player-arms',
    [ArmorType.CHEST]: '',
    [ArmorType.HEAD]: '',
    [ArmorType.LEGS]: '',
  },
  layersToCollideWith: ['Ocean'],
}
