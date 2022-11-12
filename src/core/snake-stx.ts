import { ICtx, ISnakeStore} from '~/types'
import { 
  MAP_CELL_WIDTH,
  MAP_CELL_HEIGHT
} from '~/constants/map'

export class SnakeCtx implements ICtx  {
  private snake: ISnakeStore

  constructor (snake: ISnakeStore) {
    this.snake = snake
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    // head
    ctx.fillStyle = '#000'    
    ctx.fillRect(this.snake.head.x, this.snake.head.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
    // body
    this.drawBody(ctx)
    // tail
    ctx.fillStyle = '#000'
    ctx.fillRect(this.snake.tail.x, this.snake.tail.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
  }

  private drawBody (ctx: CanvasRenderingContext2D): void {
    const line = MAP_CELL_WIDTH / 3
    console.log(line, MAP_CELL_WIDTH)
    
    this.snake.body.forEach(b => {
      ctx.fillStyle = '#e3a953'
      ctx.fillRect(b.x + line * 2, b.y, line, MAP_CELL_HEIGHT)
      ctx.fillStyle = '#000'
      ctx.fillRect(b.x + line * 1, b.y, line, MAP_CELL_HEIGHT)
      ctx.fillStyle = '#e3a953'
      ctx.fillRect(b.x, b.y, line, MAP_CELL_HEIGHT)
    })
  }
}
