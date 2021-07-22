import WebSocket from 'ws'
import Grid from '../../common/grid'
import { GameMode, Request, REQUEST_EVENT_JOIN, REQUEST_EVENT_MOVE, Response, RESPONSE_EVENT_END, RESPONSE_EVENT_MOVE, RESPONSE_EVENT_REMATCH_ACCEPTED, RESPONSE_EVENT_ROOM_CLOSED, RESPONSE_EVENT_ROOM_CREATED, RESPONSE_EVENT_START, Result, RESULT_DEFEAT, RESULT_DRAW, RESULT_VICTORY, Turn } from '../../common/types'
import logger from '../logger'

// import { GameMode, Header, Request, RequestBody, RequestEvent, Response, ResponseEvent, Result, Turn } from '../proto/tictactoe_pb'

export class Client {
  private grid = new Grid()
  private client: WebSocket
  // private stream: grpc.ClientDuplexStream<Request, Response>
  private turn: Turn = 'first'
  private result?: Result
  private error?: Error
  private done = false
  private mode: GameMode

  roomCreatedEventHandler = (res: Response) => {
    logger.debug('handler.RESPONSE_EVENT_ROOM_CREATED', 'Room created')
  }

  gameStartEventHandler = async (res: Response) => {
    const turn = res.turn
    if (turn === undefined) {
      throw new Error('Received turn = undefined')
    }

    this.turn = turn

    logger.debug('handlers.RESPONSE_EVENT_START', 'Starting as player', this.turn)

    if (turn === 'first') {
      await this.makeAMove()
    }
  }

  gameEndEventHandler = (res: Response) => {
    const move = res.move

    if (move !== undefined && Number.isInteger(move)) {
      try {
        this.grid.move(this.turn === 'first' ? 'second' : 'first', move)
      } catch (err) {
        // ignore
      }
    }
    const result = res.result

    if (result) {
      this.result = result
    }

    switch (result) {
      case RESULT_VICTORY:
        console.log('YOU WON!')
        break
      case RESULT_DEFEAT:
        console.log('YOU LOST!')
        break
      case RESULT_DRAW:
        console.log('IT\'S A DRAW!')
        break
      default: break
    }
  }

  opponentMoveHandler = async (res: Response) => {
    const move = res.move
    if (move === undefined) {
      throw new Error('Received move = undefined')
    }
    const opponent: Turn = this.turn === 'first' ? 'second' : 'first'

    this.grid.move(opponent, move)

    await this.makeAMove()
    // this.grid.repaint()
  }

  constructor (mode: GameMode) {
    const client = new WebSocket('ws://localhost:8000')
    this.client = client
    this.mode = mode

    // TODO: Rewrite the whole damn thing using event emitter

    client.on('message', async (msg: string) => {
      const res: Response = JSON.parse(msg)

      const event = res.event

      switch (event) {
        case RESPONSE_EVENT_ROOM_CREATED:
          this.roomCreatedEventHandler(res)
          break

        case RESPONSE_EVENT_REMATCH_ACCEPTED:
          this.grid = new Grid()
          this.result = undefined
          // fallthrough...

        // eslint-disable-next-line no-fallthrough
        case RESPONSE_EVENT_START:
          await this.gameStartEventHandler(res)
          break

        case RESPONSE_EVENT_MOVE:
          this.opponentMoveHandler(res)
          break

        case RESPONSE_EVENT_END:
          this.gameEndEventHandler(res)
          break

        case RESPONSE_EVENT_ROOM_CLOSED:
          client.removeAllListeners()
          client.terminate()
          break
      }
    })

    client.on('error', (err: Error) => {
      this.error = err
    })

    client.on('close', () => {
      this.done = true
      client.removeAllListeners()
      client.terminate()
    })
  }

  public play () {
    const initRequest: Request = {
      event: REQUEST_EVENT_JOIN,
      mode: this.mode

    }

    this.client.on('open', () => {
      this.client.send(JSON.stringify(initRequest))
    })
  }

  makeAMove (): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const move = this.grid.suggestMove(this.turn)

        this.grid.move(this.turn, move)

        const req = this.createMoveRequest(move)
        setTimeout(() => {
          this.client.send(JSON.stringify(req))
          resolve()
        }, 1000)
      } catch (err) {
        reject(err)
      }
    })
  }

  createMoveRequest (move: number): Request {
    const req: Request = {
      event: REQUEST_EVENT_MOVE,
      move
    }

    return req
  }
}

const c = new Client('single')
c.play()
