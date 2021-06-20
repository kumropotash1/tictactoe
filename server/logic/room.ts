import EventEmitter from 'events'
import Grid from 'tictactoe-common/grid'
import { GameMode, Header, Response, ResponseBody, ResponseEvent, Result, Turn } from 'tictactoe-common/proto/tictactoe_pb'
import { Player } from 'tictactoe-common/types'
import * as uuid from 'uuid'
import * as logger from '../logger'

export class Room {
  public players: string[] = []
  public id: string
  private mode: GameMode;
  private turn: Player = Player.FIRST;
  private grid: Grid;
  private em: EventEmitter
  private rematchRequests: string[] = []
  // eslint-disable-next-line no-unused-vars
  private playerMap: {[key: number] : string}

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
    this.playerMap = { 1: '', 2: '' }

    this.em = new EventEmitter()
  }

  private botCallback (r: Room) : (res: Response) => void {
    return function (res: Response) {
      const event = res.getEvent()
      const pid = res.getHeader()?.getToken() as string

      switch (event) {
        case ResponseEvent.RESPONSE_EVENT_START:
        case ResponseEvent.RESPONSE_EVENT_MOVE:
        case ResponseEvent.RESPONSE_EVENT_ROOM_CREATED:

          try {
            const currentPlayer = r.playerMap[r.turn]

            if (currentPlayer === pid) {
              const move = r.grid.suggestMove(r.turn)
              setTimeout(() => r.move(pid, move), 1000)
            }
          } catch (err) {
            console.error('ERROR:', err)
          }

          break

        case ResponseEvent.RESPONSE_EVENT_END:
        case ResponseEvent.RESPONSE_EVENT_REMATCH_ACCEPTED:
        case ResponseEvent.RESPONSE_EVENT_ROOM_CLOSED:
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
    this.playerMap[Player.FIRST] = this.players[p1]
    this.playerMap[Player.SECOND] = this.players[1 - p1]

    this.turn = Player.FIRST

    for (const player of Object.values(this.playerMap)) {
      const turn = this.players[p1] === player ? Turn.PLAYER_ONE : Turn.PLAYER_TWO

      const response: Response = new Response()
        .setEvent(resetMode ? ResponseEvent.RESPONSE_EVENT_REMATCH_ACCEPTED : ResponseEvent.RESPONSE_EVENT_START)
        .setHeader(new Header().setToken(player))
        .setBody(new ResponseBody().setTurn(turn))

      this.em.emit(player, response)
    }
  }

  public get isEmpty (): boolean {
    return this.mode === GameMode.MODE_DOUBLE_PLAYER && this.players.length === 1
  }

  public setPlayer (callback: Function) {
    if ((this.mode === GameMode.MODE_SINGLE_PLAYER && this.players.length) ||
      (this.mode === GameMode.MODE_DOUBLE_PLAYER && this.players.length === 2)) {
      throw new Error('Trying to add second player in single player mode')
    }

    const playerID = uuid.v4()
    this.players.push(playerID)

    this.em.on(playerID, callback as any)

    const response: Response = new Response()
      .setHeader(new Header().setToken(playerID))
      .setEvent(ResponseEvent.RESPONSE_EVENT_ROOM_CREATED)

    this.em.emit(playerID, response)

    if (this.mode === GameMode.MODE_SINGLE_PLAYER) {
      this.players.push('bot')
      this.em.on('bot', this.botCallback(this))

      const response: Response = new Response()
        .setHeader(new Header().setToken('bot'))
        .setEvent(ResponseEvent.RESPONSE_EVENT_ROOM_CREATED)

      this.em.emit('bot', response)
    }

    if (this.players.length === 2) {
      this.initialize(false)
    }

    logger.debug('room.setPlayer', `Crated room ${this.id} with users`, this.players)
  }

  public move (player: string, place: number) {
    if (place > 8) {
      throw new Error('invalid input. Expect a value between 0 and 8')
    }

    if (this.playerMap[this.turn] === player) {
      this.grid.move(this.turn, place)

      const opponent = this.playerMap[(3 - this.turn) as Player]

      const opponentResponse: Response = new Response()
        .setEvent(ResponseEvent.RESPONSE_EVENT_MOVE)
        .setHeader(new Header().setToken(opponent))
        .setBody(new ResponseBody().setMove(place))

      const victory = this.grid.isVictory(this.turn)
      const draw = this.grid.isDrawn()

      if (victory) {
        opponentResponse
          .setEvent(ResponseEvent.RESPONSE_EVENT_END)
          .getBody()?.setResult(Result.RESULT_DEFEAT)
      } else if (draw) {
        opponentResponse
          .setEvent(ResponseEvent.RESPONSE_EVENT_END)
          .getBody()?.setResult(Result.RESULT_DRAW)
      }

      this.turn = 3 - this.turn

      this.em.emit(opponent, opponentResponse)

      if (victory) {
        const playerResponse: Response = new Response()
          .setEvent(ResponseEvent.RESPONSE_EVENT_END)
          .setHeader(new Header().setToken(player))
          .setBody(new ResponseBody().setResult(Result.RESULT_VICTORY))

        this.em.emit(player, playerResponse)
        return
      }
      if (draw) {
        const playerResponse: Response = new Response()
          .setEvent(ResponseEvent.RESPONSE_EVENT_END)
          .setHeader(new Header().setToken(player))
          .setBody(new ResponseBody().setResult(Result.RESULT_DRAW))

        this.em.emit(player, playerResponse)
      }
    }
  }

  public requestRematch (player: string) {
    this.rematchRequests = [...this.rematchRequests, player]

    if (this.mode === GameMode.MODE_SINGLE_PLAYER || this.rematchRequests.length === 2) {
      this.grid = new Grid()
      this.initialize(true)
    }
  }

  public dissolve () {
    if (this.rematchRequests.length) {
      for (const playerID in this.rematchRequests) {
        this.em.emit(
          playerID,
          new Response()
            .setHeader(new Header().setToken(playerID))
            .setEvent(ResponseEvent.RESPONSE_EVENT_ROOM_CLOSED)
        )
      }
    }

    // TODO: remove the room
  }
}

const rooms : Map<string, Room> = new Map<string, Room>()

export function subscribe (mode: GameMode, callback: Function): Room {
  const roomIterator = rooms.keys()
  for (let i = 0; i < rooms.size; i++) {
    const rid = roomIterator.next().value
    logger.debug('RID:', rid)

    const r = rooms.get(rid)
    if (r && r.isEmpty) {
      r.setPlayer(callback)
      return r
    }
  }

  const r = Room.createRoom(mode)
  r.setPlayer(callback)

  return r
}
