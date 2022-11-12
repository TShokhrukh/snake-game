import React, { useEffect, useRef } from 'react'
import { IMapStore } from '~/types'
import { GameCtx } from '~/core/game-ctx'
import { MAP_HEIGHT, MAP_WIDTH } from '~/constants/map'

interface IProps {
  map: IMapStore,
  canvasNotSupport?: React.ReactNode
}

export const Game = ({ map }: IProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!(ctx instanceof CanvasRenderingContext2D)) {
      return
    }
    const game = new GameCtx(map, map.snake)
    const id = requestAnimationFrame(() => {
      game.draw(ctx)
    })
    return () => {
      clearInterval(id)
    }
  })
  

  return (
    <canvas width={MAP_WIDTH} height={MAP_HEIGHT} ref={ref} />
  )
}
