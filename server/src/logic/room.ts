import EventEmitter from 'events'
import * as uuid from 'uuid'
import Grid from '../../../common/grid'
import { GameMode, Response, RESPONSE_EVENT_END, RESPONSE_EVENT_MOVE, RESPONSE_EVENT_REMATCH_ACCEPTED, RESPONSE_EVENT_ROOM_CLOSED, RESPONSE_EVENT_ROOM_CREATED, RESPONSE_EVENT_START, RESULT_DEFEAT, RESULT_DRAW, RESULT_VICTORY, Turn } from '../../../common/types'
import * as logger from '../../logger'

export class Room {
  public players: string[] = []
  public id: string
  private mode: GameMode;
  private turn: Turn = 'first';
  private grid: Grid;
  private em: EventEmitter
  private rematchRequests: string[] = []
  // eslint-disable-next-line no-unused-vars
  private playerMap: {[k in Turn] : string}

  static createRoom (mode: GameMode) {
    const r = new Room(mode)
    rooms.set(r.id, r)

    logger.debug('room.createRoom', `Room created with mode = ${mode}`)

    return r
  }

  private constructor (mode: GameMode) {
    let tmp: string = ''
    try {
      tmp = uuid.v4()
    } catch (err) {
      console.error('ERROR:', err)
    }
    this.id = tmp as string
    this.mode = mode
    this.grid = new Grid()
    this.playerMap = { first: '', second: '' }

    this.em = new EventEmitter()
  }

  private botCallback (r: Room) : (res: Response) => void {
    let botTurn: Turn | undefined

    return function (res: Response) {
      const event = res.event

      switch (event) {
        case RESPONSE_EVENT_ROOM_CREATED:
        case RESPONSE_EVENT_START:
          botTurn = res.turn as Turn
          break
        case RESPONSE_EVENT_MOVE:
          try {
            const currentPlayer = r.playerMap[r.turn]

            if (botTurn === r.turn) {
              const move = r.grid.suggestMove(r.turn)
              setTimeout(() => r.move(currentPlayer, move), 1000)
            }
          } catch (err) {
            console.error('ERROR:', err)
          }

          break

        case RESPONSE_EVENT_END:
        case RESPONSE_EVENT_REMATCH_ACCEPTED:
        case RESPONSE_EVENT_ROOM_CLOSED:
        default:
          break
      }
    }
  }

  private initialize (resetMode: boolean) {
    if (this.players.length < 2) {
      // Hint: If you see this error, and if the room is created in single player mode,
      // check if a bot is getting from setPlayer() function.
      throw new Error('Room is not full. Requires two participants')
    }
    const p1 = Math.floor(Math.random() * 2)
    this.playerMap.first = this.players[p1]
    this.playerMap.second = this.players[1 - p1]

    this.turn = 'first'

    for (const player of Object.values(this.playerMap)) {
      const turn: Turn = this.players[p1] === player ? 'first' : 'second'

      const response: Response = {
        event: resetMode ? RESPONSE_EVENT_REMATCH_ACCEPTED : RESPONSE_EVENT_START,
        turn
      }

      this.em.emit(player, response)
    }
  }

  public get isEmpty (): boolean {
    return this.mode === 'double' && this.players.length === 1
  }

  public setPlayer (subscribe: (res: Response) => void) {
    if ((this.mode === 'single' && this.players.length) ||
      (this.mode === 'double' && this.players.length === 2)) {
      throw new Error('Trying to add second player in single player mode')
    }

    const playerID = uuid.v4()
    this.players.push(playerID)

    this.em.on(playerID, subscribe)

    const response: Response = {
      event: RESPONSE_EVENT_ROOM_CREATED
    }

    this.em.emit(playerID, response)

    if (this.mode === 'single') {
      this.players.push('bot')
      this.em.on('bot', this.botCallback(this))

      const response: Response = {
        event: RESPONSE_EVENT_ROOM_CREATED
      }

      this.em.emit('bot', response)
    }

    if (this.players.length === 2) {
      this.initialize(false)
    }

    logger.debug('room.setPlayer', `Crated room ${this.id} with users`, this.players)
    return playerID
  }

  public move (player: string, place: number) {
    if (place > 8) {
      throw new Error('invalid input. Expect a value between 0 and 8')
    }

    if (this.playerMap[this.turn] === player) {
      this.grid.move(this.turn, place)

      const opponentTurn: Turn = this.turn === 'first' ? 'second' : 'first'
      const opponentToken: string = this.playerMap[opponentTurn]

      const opponentResponse: Response = {
        event: RESPONSE_EVENT_MOVE,
        move: place
      }

      const victory = this.grid.isVictory(this.turn)
      const draw = this.grid.isDrawn()

      if (victory) {
        opponentResponse.event = RESPONSE_EVENT_END
        opponentResponse.result = RESULT_DEFEAT
      } else if (draw) {
        opponentResponse.event = RESPONSE_EVENT_END
        opponentResponse.result = RESULT_DRAW
      }

      this.turn = this.turn === 'first' ? 'second' : 'first'

      this.em.emit(opponentToken, opponentResponse)

      if (victory) {
        const playerResponse: Response = {
          event: RESPONSE_EVENT_END,
          result: RESULT_VICTORY
        }

        this.em.emit(player, playerResponse)
        return
      }
      if (draw) {
        const playerResponse: Response = {
          event: RESPONSE_EVENT_END,
          result: RESULT_DRAW
        }

        this.em.emit(player, playerResponse)
      }
    }
  }

  public requestRematch (player: string) {
    this.rematchRequests = [...this.rematchRequests, player]

    if (this.mode === 'single' || this.rematchRequests.length === 2) {
      this.grid = new Grid()
      this.initialize(true)
    }
  }

  public dissolve () {
    if (this.rematchRequests.length) {
      for (const playerID in this.rematchRequests) {
        this.em.emit(
          playerID,
          {
            event: RESPONSE_EVENT_ROOM_CLOSED,
            token: playerID
          } as Response
        )
      }
    }

    // TODO: remove the room
  }
}

const rooms : Map<string, Room> = new Map<string, Room>()

export function subscribe (mode: GameMode, handler: (res: Response) => void, callback: (tok: string) => void): Room {
  const roomIterator = rooms.keys()
  let r : Room | undefined
  let token: string
  for (let i = 0; i < rooms.size; i++) {
    const rid = roomIterator.next().value
    logger.debug('RID:', rid)

    r = rooms.get(rid)
    if (r && r.isEmpty) {
      token = r.setPlayer(handler)
    }
  }

  r = Room.createRoom(mode)
  token = r.setPlayer(handler)

  callback(token)

  return r
}
