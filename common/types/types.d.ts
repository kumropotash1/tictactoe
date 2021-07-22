

export type GridValue = 0 | 1 | 2;

export type Grid = [
  GridValue, GridValue, GridValue,
  GridValue, GridValue, GridValue,
  GridValue, GridValue, GridValue
]

type RequestEvent = string

type ResponseEvent = string

type Result = string

type GameMode = "single" | "double"

type Turn = "first" | "second"

export type Request = {
  event: RequestEvent,
  mode?: GameMode,
  move?: number
}

export type Response = {
  event: ResponseEvent,
  turn?: Turn,
  move?: number,
  error?: string,
  result?: Result,
}
