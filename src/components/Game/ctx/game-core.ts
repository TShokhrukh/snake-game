import { IGame, ICtx, IMap, ICell, ISnake, TGameStatus, TMoveAction, IFood } from '~/types/index'
import { BASE_SNAKE_LENGTH } from '~/constants/snake'
import { MapCtx } from './map-ctx'
import { SnakeCtx } from './snake-ctx'
import { FoodCtx } from './food-ctx'
import { comparePositions } from '~/utils/comparePositions'
import { MAP_HEIGHT, MAP_WIDTH } from '~/constants/map'

const KEYBOARD_MOVE_ACTIONS: { [K: string]: TMoveAction } = {
  KeyW: 'top',
  KeyA: 'left',
  KeyS: 'bottom',
  KeyD: 'right'
}

export class GameCore implements IGame {
  private snake: (ICtx & ISnake)
  private map: (ICtx & IMap)
  private food: (ICtx & IFood)

  private interval: number
  private intervalId: NodeJS.Timer|undefined
  private moveAction: TMoveAction|undefined
  
  public status: TGameStatus

  constructor () {
    this.interval = 180
    this.map = new MapCtx()
    this.snake = new SnakeCtx(this.getSnakeStartPosition())
    this.food = new FoodCtx(this.getFoodPosition())
  }

  public get isPlaying () {
    return this.status === 'playing'
  }

  public start (ctx: CanvasRenderingContext2D) {
    this.status = 'playing'   
    this.draw(ctx)
    document.addEventListener('keydown', this.onKeyDown)

    this.intervalId = setInterval(() => {
      if (this.moveAction) {
        this.snake.move(this.moveAction)
      }
      if (comparePositions(this.food.position, this.snake.head)) {
        this.food.setPosition(this.getFoodPosition())
        this.snake.grow()
      }
      this.draw(ctx)
    }, this.interval)
  }

  public restart () {
    document.removeEventListener('keydown', this.onKeyDown)
    clearInterval(this.intervalId)
  }

  public stop () {
    document.removeEventListener('keydown', this.onKeyDown)
    clearInterval(this.intervalId)
  }

  private draw (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT)
    
    this.map.draw(ctx)
    this.food.draw(ctx)
    this.snake.draw(ctx)
  }

  private getSnakeStartPosition (): ICell[] {    
    return this.map.grid[Math.floor(this.map.rows / 2)].slice(2, BASE_SNAKE_LENGTH + 2).reverse()
  }

  private getFoodPosition (): ICell {
    const index = Math.floor(Math.random() * this.map.cells.length + 1)
    const position = this.map.cells[index]

    if (this.snake.position.find(p => p.x === position.x && p.y === position.y)) {
      return this.getFoodPosition()
    }
    
    return position
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (!(event.code in KEYBOARD_MOVE_ACTIONS)) {
      return
    }
    
    const action: TMoveAction = KEYBOARD_MOVE_ACTIONS[event.code]
    // this.snake.move(action)
    this.moveAction = action
  }
}
