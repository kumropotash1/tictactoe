/**
 * @fileoverview gRPC-Web generated client stub for tictactoe.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.tictactoe = {};
proto.tictactoe.v1 = require('./tictactoe_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tictactoe.v1.TicTacToeClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tictactoe.v1.TicTacToePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tictactoe.v1.Request,
 *   !proto.tictactoe.v1.Response>}
 */
const methodDescriptor_TicTacToe_TestUnary = new grpc.web.MethodDescriptor(
  '/tictactoe.v1.TicTacToe/TestUnary',
  grpc.web.MethodType.UNARY,
  proto.tictactoe.v1.Request,
  proto.tictactoe.v1.Response,
  /**
   * @param {!proto.tictactoe.v1.Request} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictactoe.v1.Response.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tictactoe.v1.Request,
 *   !proto.tictactoe.v1.Response>}
 */
const methodInfo_TicTacToe_TestUnary = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tictactoe.v1.Response,
  /**
   * @param {!proto.tictactoe.v1.Request} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictactoe.v1.Response.deserializeBinary
);


/**
 * @param {!proto.tictactoe.v1.Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tictactoe.v1.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tictactoe.v1.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tictactoe.v1.TicTacToeClient.prototype.testUnary =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tictactoe.v1.TicTacToe/TestUnary',
      request,
      metadata || {},
      methodDescriptor_TicTacToe_TestUnary,
      callback);
};


/**
 * @param {!proto.tictactoe.v1.Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tictactoe.v1.Response>}
 *     Promise that resolves to the response
 */
proto.tictactoe.v1.TicTacToePromiseClient.prototype.testUnary =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tictactoe.v1.TicTacToe/TestUnary',
      request,
      metadata || {},
      methodDescriptor_TicTacToe_TestUnary);
};


module.exports = proto.tictactoe.v1;

