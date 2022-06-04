import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI
  public rexUI!: RexUIPlugin

  constructor() {
    super('ui')
    GameUI._instance = this
  }

  public static get instance() {
    return GameUI._instance
  }
}
