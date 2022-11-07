import { makeObservable, observable, action, computed } from 'mobx'
import { IPosition, ISnakeStore } from '~/types'
import { MAP_CELL_WIDTH, MAP_CELL_HEIGHT } from '~/constants/map'

type TMoveAction = 'top'|'right'|'bottom'|'left'
// type TSnakeStatus = 'die'|'moving'|''

export class SnakeStore implements ISnakeStore {
  static WIDTH = MAP_CELL_WIDTH
  static HEIGHT = MAP_CELL_HEIGHT
  static MOVE_INTERVAL = 1e3

  // @observable public status: TSnakeStatus = ''
  @observable
  public position: IPosition[] = []

  private moveAction: TMoveAction|undefined
  private moveInterval: NodeJS.Timer|undefined

  constructor () {
    makeObservable(this)
  }

  @computed
  public get head (): IPosition {
    return this.position[0]
  }

  @computed
  public get body (): IPosition[] {
    return this.position.slice(0, this.position.length - 1)
  }

  @computed
  public get tail (): IPosition {
    return this.position[this.position.length - 1]
  }

  @action
  public move (action: TMoveAction) {
    if (this.canMove(action)) {
      return
    }
    
    this.moveAction = action

    if (this.moveInterval) {
      clearInterval(this.moveInterval)
    }

    this.position = this.doMove(action)
    this.moveInterval = setInterval(() => {
      this.position = this.doMove(action)
    }, SnakeStore.MOVE_INTERVAL)
  }

  @action
  public grow () {
    this.position = [...this.position, { x: 0, y: 0 }]
  }

  public canMove (action: TMoveAction): boolean {
    if (this.moveAction === 'left' && action === 'right') {
      return false
    }
    if (this.moveAction === 'right' && action === 'left') {
      return false
    }
    if (this.moveAction === 'top' && action === 'bottom') {
      return false
    }
    if (this.moveAction === 'bottom' && action === 'top') {
      return false
    }
    return true
  }

  private doMove (action: TMoveAction): IPosition[] {
    return this.position.map((p, i, arr) => {
      return {...arr[i + 1]}
    })
  }
}
