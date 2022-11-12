import { ICtx, IMapStore} from '~/types'
import { 
  MAP_CELL_WIDTH,
  MAP_CELL_HEIGHT,
  MAP_CELL_COLORS
} from '~/constants/map'

export class MapStx implements ICtx {
  private map: IMapStore

  constructor (map: IMapStore) {
    this.map = map
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    this.map.grid.forEach((row, i) => {
      row.forEach((p, n) => {
        ctx.fillStyle = this.getFillStyle(i, n)
        ctx.fillRect(p.x, p.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
      })
    })
  }

  private getFillStyle (rowIndex: number, columnIndex: number): string {
    const isColumnOdd = columnIndex % 2
    if (rowIndex % 2) {
      return isColumnOdd ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
    }
    return !isColumnOdd ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
  }
}
