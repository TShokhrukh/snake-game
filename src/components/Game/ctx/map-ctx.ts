import { ICtx, IMap, ICell } from '~/types/index'
import { 
  MAP_WIDTH, 
  MAP_HEIGHT,
  MAP_CELL_WIDTH,
  MAP_CELL_HEIGHT,
  MAP_CELL_COLORS
} from '~/constants/map'

export class MapCtx implements ICtx, IMap {
  cells: ICell[]

  constructor () {
    this.cells = this.fillCells()
  }

  public get rows (): number {
    return MAP_HEIGHT / MAP_CELL_HEIGHT
  }

  public get columns (): number {
    return MAP_WIDTH / MAP_CELL_WIDTH
  }

  public get grid (): (ICell[])[] {
    return (new Array(this.rows)).fill(undefined)
      .map((_n, i) => i * MAP_CELL_HEIGHT)
      .map(h => this.cells.filter(p => p.y === h))
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    this.grid.forEach((row, i) => {
      row.forEach((p, n) => {
        ctx.fillStyle = this.fillColor(i, n)
        ctx.fillRect(p.x, p.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
      })
    })
  }

  private fillCells (): ICell[] {
    return (new Array(this.rows))
      .fill(undefined)
      .map((_n, i) => i * MAP_CELL_HEIGHT)
      .map(y => {
        return (new Array(this.columns))
          .fill(undefined)
          .map((_n, i) => i * MAP_CELL_WIDTH)
          .map(x => ({ y, x }))
      })
      .reduce((prev, arr) => [...prev, ...arr], [])
  }

  private fillColor (rowIndex: number, columnIndex: number): string {
    const isColumnOdd = columnIndex % 2
    if (rowIndex % 2) {
      return isColumnOdd ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
    }
    return !isColumnOdd ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
  }
}
