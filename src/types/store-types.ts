
export interface IPosition {
  x: number
  y: number
}

export interface ISnakeStore {
  position: IPosition[]

  get head(): IPosition
  get body(): IPosition[]
  get tail(): IPosition

  move(a: string): void
  setPosition(a: IPosition[]): void
  // grow(): void
  // canMove(a: string): boolean
}

export interface IMapStore {
  snake: ISnakeStore
  cells: IPosition[]
  // food: IPosition

  get rows(): number
  get columns(): number
  get grid(): (IPosition[])[]

  // spawnFood(): void
}
