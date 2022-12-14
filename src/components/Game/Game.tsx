import React, { useEffect, useRef, useState } from 'react'
// import { IMapStore, TMoveAction } from '~/types'
import { GameCore } from './ctx/game-core'
import { MAP_HEIGHT, MAP_WIDTH } from '~/constants/map'
import { IGame } from '~/types'

// interface IProps {
//   snake: any,
//   map: any,
// }

export const Game = () => {
  const [core] = useState<IGame>(() => new GameCore())
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!(ctx instanceof CanvasRenderingContext2D) || core.isPlaying) {
      return
    }    
    core.start(ctx)
  })
  
  return (
    <canvas width={MAP_WIDTH} height={MAP_HEIGHT} ref={ref} />
  )
}
