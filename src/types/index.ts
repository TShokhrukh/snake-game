export type TMoveAction = 'top'|'right'|'bottom'|'left'
export type TGameStatus = 'playing'|undefined

export interface ICell {
  x: number
  y: number
}

export interface IMap {
  readonly MAP_HEIGHT: number
  readonly MAP_WIDTH: number
  readonly MAP_CELL_HEIGHT: number
  readonly MAP_CELL_WIDTH: number
  cells: ICell[]

  rows: number
  columns: number
  grid: (ICell[])[]
}

export interface ISnake {
  position: ICell[]

  get head(): ICell
  get body(): ICell[]
  get tail(): ICell
  get isDed(): boolean
  get length(): number

  grow(): void
  die(): void
  move(action: TMoveAction): void
  canMoveTo(action: TMoveAction): boolean
}

export interface IFood {
  position: ICell

  setPosition (position: ICell): void
}

export interface ICtx {
  draw (ctx: CanvasRenderingContext2D): void
}

export interface IGame {
  status: TGameStatus

  get isPlaying(): boolean

  start(ctx: CanvasRenderingContext2D): void
  restart(): void
  stop(): void
}
