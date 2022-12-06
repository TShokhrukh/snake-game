import { ICell } from '~/types'

export const comparePositions = (p1: ICell, p2: ICell): boolean => {
  return p1.x === p2.x && p1.y === p2.y
}
