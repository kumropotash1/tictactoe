import * as grpcWeb from 'grpc-web';

import * as tictactoe_pb from './tictactoe_pb';


export class TicTacToeClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  testUnary(
    request: tictactoe_pb.Request,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: tictactoe_pb.Response) => void
  ): grpcWeb.ClientReadableStream<tictactoe_pb.Response>;

}

export class TicTacToePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  testUnary(
    request: tictactoe_pb.Request,
    metadata?: grpcWeb.Metadata
  ): Promise<tictactoe_pb.Response>;

}

