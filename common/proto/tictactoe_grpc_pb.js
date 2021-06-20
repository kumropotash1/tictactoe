// GENERATED CODE -- DO NOT EDIT!

'use strict'
const grpc = require('@grpc/grpc-js')
const proto_tictactoe_pb = require('../proto/tictactoe_pb.js')

function serialize_tictactoe_v1_Request (arg) {
  if (!(arg instanceof proto_tictactoe_pb.Request)) {
    throw new Error('Expected argument of type tictactoe.v1.Request')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_tictactoe_v1_Request (buffer_arg) {
  return proto_tictactoe_pb.Request.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_tictactoe_v1_Response (arg) {
  if (!(arg instanceof proto_tictactoe_pb.Response)) {
    throw new Error('Expected argument of type tictactoe.v1.Response')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_tictactoe_v1_Response (buffer_arg) {
  return proto_tictactoe_pb.Response.deserializeBinary(new Uint8Array(buffer_arg))
}

const TicTacToeService = exports.TicTacToeService = {
  connect: {
    path: '/tictactoe.v1.TicTacToe/Connect',
    requestStream: true,
    responseStream: true,
    requestType: proto_tictactoe_pb.Request,
    responseType: proto_tictactoe_pb.Response,
    requestSerialize: serialize_tictactoe_v1_Request,
    requestDeserialize: deserialize_tictactoe_v1_Request,
    responseSerialize: serialize_tictactoe_v1_Response,
    responseDeserialize: deserialize_tictactoe_v1_Response
  }
}

exports.TicTacToeClient = grpc.makeGenericClientConstructor(TicTacToeService)
