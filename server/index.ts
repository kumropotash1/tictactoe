/* eslint-disable no-case-declarations */
import * as grpc from '@grpc/grpc-js'
import { ITicTacToeServer, TicTacToeService } from 'tictactoe-common/proto/tictactoe_grpc_pb'
import { Header, Request, RequestEvent, Response, ResponseEvent } from 'tictactoe-common/proto/tictactoe_pb'
import logger from './logger'
import { Room, subscribe } from './logic/room'

class GameServer implements ITicTacToeServer {
  connect (call: grpc.ServerDuplexStream<Request, Response>):void {
    let room: Room
    let token: string | undefined

    const responseHandler = (res: Response) => {
      call.write(res)

      const event = res.getEvent()
      if (event === ResponseEvent.RESPONSE_EVENT_ROOM_CLOSED) {
        logger.debug('server.connect', 'Room closed')
        call.removeAllListeners()
        call.end()
      }
    }

    const joinRequestEventHandler = (req: Request, token: string): void => {
      const mode = req.getBody()?.getGameMode()
      if (mode !== undefined) {
        // TODO: define the callback function
        // Actually... YOLO

        room = subscribe(mode, responseHandler)
      }
    }

    const moveRequestEventHandler = (req: Request, token: string): void => {
      const move = req.getBody()?.getMove()

      if (move === undefined) {
        responseHandler(
          new Response()
            .setEvent(ResponseEvent.RESPONSE_EVENT_ERROR)
            .setHeader(new Header().setToken(token))
            .setErrorMessage('Expected a valid move, received undefined')
        )
        return
      }

      room.move(token as string, move)
    }

    call.on('data', (req: Request): void => {
      const event = req.getEvent()
      token = req.getHeader()?.getToken() || token

      if (!token) {
        call.write(
          new Response()
            .setEvent(ResponseEvent.RESPONSE_EVENT_ERROR)
            .setErrorMessage('token not received')
        )
        call.end()
        return
      }

      switch (event) {
        case RequestEvent.REQUEST_EVENT_JOIN:
          joinRequestEventHandler(req, token)
          return

        case RequestEvent.REQUEST_EVENT_MOVE:
          moveRequestEventHandler(req, token)
          return

        case RequestEvent.REQUEST_EVENT_CLOSE:
          room.dissolve()
          call.end()
          return

        case RequestEvent.REQUEST_EVENT_REMATCH:
        case RequestEvent.REQUEST_EVENT_RESTART:
          room.requestRematch(token as string)
      }
    })
  }
}

function main () {
  const server = new grpc.Server()

  // @ts-ignore
  server.addService(TicTacToeService, new GameServer())
  server.bindAsync(
    'localhost:50051',
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(`Server error: ${err.message}`)
      } else {
        logger.debug('main', `Server bound on port: ${port}`)
        server.start()
      }
    }
  )
}

main()
