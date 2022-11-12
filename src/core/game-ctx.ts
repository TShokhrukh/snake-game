import { ICtx, IGameCtx, IMapStore, ISnakeStore } from '~/types'
import { 
  MAP_CELL_WIDTH,
  MAP_CELL_HEIGHT,
  MAP_CELL_COLORS
} from '~/constants/map'
import { MapStx } from './map-stx'
import { SnakeCtx } from './snake-stx'

export function gameCtx (ctx: CanvasRenderingContext2D, map: IMapStore) {
  return () => {
    drawMap()
    drawSnake()
  }

  function drawMap () {    
    map.grid.forEach((row, i) => {
      row.forEach((p, n) => {
        if (i % 2) {
          ctx.fillStyle = n % 2 ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
        } else {
          ctx.fillStyle = !(n % 2) ? MAP_CELL_COLORS[0] : MAP_CELL_COLORS[1]
        }
        ctx.fillRect(p.x, p.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
      })
    })
  }

  function drawSnake () {    
    ctx.fillStyle = '#f1f'
    ctx.fillRect(map.snake.head.x, map.snake.head.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)

    map.snake.position.forEach((p) => {
      ctx.fillRect(p.x, p.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
    })
  }
}

export class GameCtx implements IGameCtx {
  public snake: ICtx
  public map: ICtx

  constructor (map: IMapStore, snake: ISnakeStore) {
    this.map = new MapStx(map)
    this.snake = new SnakeCtx(snake)
  }

  draw (ctx: CanvasRenderingContext2D): void {
    this.map.draw(ctx)
    this.snake.draw(ctx)
  }
}
