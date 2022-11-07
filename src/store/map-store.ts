import { makeObservable, observable, action, computed } from 'mobx'
import { 
  MAP_WIDTH, 
  MAP_HEIGHT,
  MAP_CELL_WIDTH,
  MAP_CELL_HEIGHT
} from '~/constants/map'
import { IPosition, ISnakeStore, IMapStore } from '~/types'
import { SnakeStore } from './snake-store'

export class MapsStore implements IMapStore {
  @observable public cells: IPosition[]
  @observable public snake: ISnakeStore

  constructor () {
    this.cells = this.fillCells()
    this.snake = new SnakeStore()
    makeObservable(this)
  }

  @computed
  public get rows (): number {
    return MAP_HEIGHT / MAP_CELL_HEIGHT
  }

  @computed
  public get columns (): number {
    return MAP_WIDTH / MAP_CELL_WIDTH
  }

  public get grid () {
    return (new Array(this.rows)).fill(undefined)
      .map((_n, i) => i * MAP_CELL_HEIGHT)
      .map(h => this.cells.filter(p => p.y === h))
  }

  private fillCells (): IPosition[] {
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
}
