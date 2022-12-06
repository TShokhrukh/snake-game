import { MAP_CELL_HEIGHT, MAP_CELL_WIDTH } from '~/constants/map'
import { ICtx, ICell, ISnake, TMoveAction } from '~/types/index'

export class SnakeCtx implements ICtx, ISnake {
  private status: 'live'|'die'
  private prevMoveAction: TMoveAction|undefined
  position: ICell[]

  constructor (position: ICell[]) {
    this.position = position
    this.status = 'live'
  }

  public get head (): ICell {
    return this.position[0]
  }

  public get body (): ICell[] {
    return this.position.slice(1, this.position.length - 1)
  }

  public get tail (): ICell {
    return this.position[this.length - 1]
  }

  public get length (): number {
    return this.position.length
  }

  public get isDed (): boolean {
    return false
  }

  public grow (): void {
    this.position = this.position.concat({
      y: this.tail.y,
      x: this.tail.x - MAP_CELL_WIDTH,
    })
  }

  public move (action: TMoveAction): void {  
    if (!this.canMoveTo(action) && this.prevMoveAction) {
      action = this.prevMoveAction
    }
    for (let index = this.position.length - 1; index >= 0; index--) {
      const position = this.position[index]
      if (index === 0) {        
        switch (action) {
          case 'top':
            this.position[index] = { ...position, y: position.y - MAP_CELL_HEIGHT }
            break
          case 'bottom':
            this.position[index] = { ...position, y: position.y + MAP_CELL_HEIGHT }
            break
          case 'left':
            this.position[index] = { ...position, x: position.x - MAP_CELL_WIDTH }
            break
          case 'right':
            this.position[index] = { ...position, x: position.x + MAP_CELL_WIDTH }
            break
        }
        continue
      }
      this.position[index] = this.position[index - 1]
      // position.x = this.position[index - 1].x
      // position.y = this.position[index - 1].y
    }

    this.prevMoveAction = action
  }

  public canMoveTo (action: TMoveAction): boolean {
    if (!this.prevMoveAction) {
      return true
    }
    const valid: { [K: string]: TMoveAction[] } = {
      top: ['left', 'right'],
      left: ['top', 'bottom'],
      right: ['top', 'bottom'],
      bottom: ['left', 'right'],
    }
    
    return !!(~valid[this.prevMoveAction].indexOf(action))
  }

  public die () {
    this.status = 'die'
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    this.drawHead(ctx)
    this.drawBody(ctx)
    this.drawTail(ctx)
  }

  private drawHead (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000'    
    ctx.fillRect(this.head.x, this.head.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
  }

  private drawBody (ctx: CanvasRenderingContext2D): void {
    const line = MAP_CELL_WIDTH / 3
    
    this.body.forEach(b => {
      ctx.fillStyle = '#e3a953'
      ctx.fillRect(b.x + line * 2, b.y, line, MAP_CELL_HEIGHT)
      ctx.fillStyle = '#000'
      ctx.fillRect(b.x + line * 1, b.y, line, MAP_CELL_HEIGHT)
      ctx.fillStyle = '#e3a953'
      ctx.fillRect(b.x, b.y, line, MAP_CELL_HEIGHT)
    })
  }

  private drawTail (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000'
    ctx.fillRect(this.tail.x, this.tail.y, MAP_CELL_WIDTH, MAP_CELL_HEIGHT)
  }
}
