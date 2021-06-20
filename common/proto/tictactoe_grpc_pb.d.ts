// package: tictactoe.v1
// file: proto/tictactoe.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as proto_tictactoe_pb from "./tictactoe_pb";

interface ITicTacToeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    connect: ITicTacToeService_IConnect;
}

interface ITicTacToeService_IConnect extends grpc.MethodDefinition<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response> {
    path: "/tictactoe.v1.TicTacToe/Connect";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<proto_tictactoe_pb.Request>;
    requestDeserialize: grpc.deserialize<proto_tictactoe_pb.Request>;
    responseSerialize: grpc.serialize<proto_tictactoe_pb.Response>;
    responseDeserialize: grpc.deserialize<proto_tictactoe_pb.Response>;
}

export const TicTacToeService: ITicTacToeService;

export interface ITicTacToeServer {
    connect: grpc.handleBidiStreamingCall<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
}

export interface ITicTacToeClient {
    connect(): grpc.ClientDuplexStream<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
    connect(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
    connect(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
}

export class TicTacToeClient extends grpc.Client implements ITicTacToeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public connect(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
    public connect(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_tictactoe_pb.Request, proto_tictactoe_pb.Response>;
}
