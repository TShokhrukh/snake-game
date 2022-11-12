
export interface ICtx {
  draw(ctx: CanvasRenderingContext2D): void
}

export interface IGameCtx {
  map: ICtx
  snake: ICtx
  draw(ctx: CanvasRenderingContext2D): void
}
