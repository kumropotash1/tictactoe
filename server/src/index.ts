/* eslint-disable no-case-declarations */
import * as ws from 'ws'
import { Request, REQUEST_EVENT_CLOSE, REQUEST_EVENT_JOIN, REQUEST_EVENT_MOVE, REQUEST_EVENT_REMATCH, REQUEST_EVENT_RESTART, Response, RESPONSE_EVENT_ERROR, RESPONSE_EVENT_ROOM_CLOSED } from '../../common/types'
// import { Header, Request, RequestEvent, Response, ResponseEvent } from '../../common/proto/tictactoe_pb'
import logger from '../logger'
import { Room, subscribe } from './logic/room'

/**
 * NOTE:
 * Turns out that grpc-web does not support bidirectional streaming yet.
 * We, therefore, will use websocket in order to implement duplex communication channel
 * request and response pb.ts files will be used in both front end and back end in order to guarantee type safety
 */

function main () {
  const wsServer = new ws.Server({
    port: 8000
  })

  wsServer.on('close', () => {
    logger.info('close', 'connection close request received')
  })

  wsServer.on('listening', () => {
    console.log('listening')
  })

  wsServer.on('connection', (ws) => {
    logger.info('ws-connect', 'connect request received')

    let room: Room
    let token = ''

    const responseHandler = (res: Response) => {
      logger.debug('responseHandler', `RESPONSE: ${JSON.stringify(res)}`)
      ws.send(JSON.stringify(res))

      const event = res.event
      if (event === RESPONSE_EVENT_ROOM_CLOSED) {
        logger.debug('server.connect', 'Room closed')

        ws.removeAllListeners()
        ws.terminate()
      }
    }

    const joinRequestEventHandler = (req: Request): void => {
      const mode = req.mode
      if (mode !== undefined) {
      // TODO: define the callback function
      // Actually... YOLO

        room = subscribe(mode, responseHandler, (tok: string) => {
          console.log('SETTING TOKEN: ', tok)
          token = tok
        })
      }
    }

    const moveRequestEventHandler = (req: Request): void => {
      const move = req.move

      if (move === undefined) {
        console.log('moveRequestEventHandler')
        responseHandler(
          {
            event: RESPONSE_EVENT_ERROR,
            error: 'Expected a valid move, received undefined'
          } as Response
        )
        return
      }

      if (!token) {
        ws.send(
          JSON.stringify({
            event: RESPONSE_EVENT_ERROR,
            error: 'token not received'
          } as Response)
        )
        ws.terminate()
      }

      room.move(token as string, move)
    }

    ws.on('message', (msg: string): void => {
      const req: Request = JSON.parse(msg)

      console.log('MESSAGE RECEIVED', msg)

      const event = req.event

      switch (event) {
        case REQUEST_EVENT_JOIN:
          joinRequestEventHandler(req)
          return

        case REQUEST_EVENT_MOVE:
          moveRequestEventHandler(req)
          return

        case REQUEST_EVENT_CLOSE:
          room.dissolve()
          ws.terminate()
          return

        case REQUEST_EVENT_REMATCH:
        case REQUEST_EVENT_RESTART:
          if (!token) {
            ws.send(
              JSON.stringify({
                event: RESPONSE_EVENT_ERROR,
                error: 'token not received'
              } as Response)
            )
            ws.terminate()
          }

          room.requestRematch(token as string)
      }
    })
  })
}

main()
