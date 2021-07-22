import { RequestEvent, ResponseEvent, Result } from "./types"

/* eslint-disable no-unused-vars */
export const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

export enum Level {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2
}

export enum Mode {
  MIN = -1,
  MAX = 1
}


export const REQUEST_EVENT_JOIN : RequestEvent = "REQUEST_EVENT_JOIN"
export const REQUEST_EVENT_MOVE: RequestEvent = "REQUEST_EVENT_MOVE"
export const REQUEST_EVENT_REMATCH: RequestEvent = "REQUEST_EVENT_REMATCH"
export const REQUEST_EVENT_CLOSE: RequestEvent = "REQUEST_EVENT_CLOSE"
export const REQUEST_EVENT_RESTART: RequestEvent = "REQUEST_EVENT_RESTART"

export const RESPONSE_EVENT_START: ResponseEvent = "RESPONSE_EVENT_START"
export const RESPONSE_EVENT_MOVE: ResponseEvent = "RESPONSE_EVENT_MOVE"
export const RESPONSE_EVENT_END: ResponseEvent = "RESPONSE_EVENT_END"
export const RESPONSE_EVENT_REMATCH_ACCEPTED: ResponseEvent = "RESPONSE_EVENT_REMATCH_ACCEPTED"
export const RESPONSE_EVENT_ROOM_CREATED: ResponseEvent = "RESPONSE_EVENT_ROOM_CREATED"
export const RESPONSE_EVENT_ROOM_CLOSED: ResponseEvent = "RESPONSE_EVENT_ROOM_CLOSED"
export const RESPONSE_EVENT_ERROR: ResponseEvent = "RESPONSE_EVENT_ERROR"

export const RESULT_VICTORY: Result = "victory"
export const RESULT_DRAW: Result = "draw"
export const RESULT_DEFEAT: Result = "defeat"