import { MAP_CELL_HEIGHT, MAP_CELL_WIDTH } from '~/constants/map'
import { ICtx, ICell, IFood } from '~/types/index'

export class FoodCtx implements ICtx, IFood {
  public position: ICell

  constructor (position: ICell) {
    this.position = position
  }

  public setPosition (position: ICell): void {
    this.position = position
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#f00'    
    ctx.fillRect(this.position.x, this.position.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
  }
}
