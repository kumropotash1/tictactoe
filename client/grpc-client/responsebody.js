// source: tictactoe.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.tictactoe.v1.ResponseBody');
goog.provide('proto.tictactoe.v1.ResponseBody.RespCase');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

goog.forwardDeclare('proto.tictactoe.v1.Result');
goog.forwardDeclare('proto.tictactoe.v1.Turn');
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tictactoe.v1.ResponseBody = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.tictactoe.v1.ResponseBody.oneofGroups_);
};
goog.inherits(proto.tictactoe.v1.ResponseBody, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.tictactoe.v1.ResponseBody.displayName = 'proto.tictactoe.v1.ResponseBody';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.tictactoe.v1.ResponseBody.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.tictactoe.v1.ResponseBody.RespCase = {
  RESP_NOT_SET: 0,
  MOVE: 1,
  TURN: 2
};

/**
 * @return {proto.tictactoe.v1.ResponseBody.RespCase}
 */
proto.tictactoe.v1.ResponseBody.prototype.getRespCase = function() {
  return /** @type {proto.tictactoe.v1.ResponseBody.RespCase} */(jspb.Message.computeOneofCase(this, proto.tictactoe.v1.ResponseBody.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tictactoe.v1.ResponseBody.prototype.toObject = function(opt_includeInstance) {
  return proto.tictactoe.v1.ResponseBody.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tictactoe.v1.ResponseBody} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tictactoe.v1.ResponseBody.toObject = function(includeInstance, msg) {
  var f, obj = {
    move: jspb.Message.getFieldWithDefault(msg, 1, 0),
    turn: jspb.Message.getFieldWithDefault(msg, 2, 0),
    result: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tictactoe.v1.ResponseBody}
 */
proto.tictactoe.v1.ResponseBody.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tictactoe.v1.ResponseBody;
  return proto.tictactoe.v1.ResponseBody.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tictactoe.v1.ResponseBody} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tictactoe.v1.ResponseBody}
 */
proto.tictactoe.v1.ResponseBody.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMove(value);
      break;
    case 2:
      var value = /** @type {!proto.tictactoe.v1.Turn} */ (reader.readEnum());
      msg.setTurn(value);
      break;
    case 3:
      var value = /** @type {!proto.tictactoe.v1.Result} */ (reader.readEnum());
      msg.setResult(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tictactoe.v1.ResponseBody.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tictactoe.v1.ResponseBody.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tictactoe.v1.ResponseBody} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tictactoe.v1.ResponseBody.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {!proto.tictactoe.v1.Turn} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getResult();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional int32 move = 1;
 * @return {number}
 */
proto.tictactoe.v1.ResponseBody.prototype.getMove = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.tictactoe.v1.ResponseBody} returns this
 */
proto.tictactoe.v1.ResponseBody.prototype.setMove = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.tictactoe.v1.ResponseBody.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.tictactoe.v1.ResponseBody} returns this
 */
proto.tictactoe.v1.ResponseBody.prototype.clearMove = function() {
  return jspb.Message.setOneofField(this, 1, proto.tictactoe.v1.ResponseBody.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.tictactoe.v1.ResponseBody.prototype.hasMove = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Turn turn = 2;
 * @return {!proto.tictactoe.v1.Turn}
 */
proto.tictactoe.v1.ResponseBody.prototype.getTurn = function() {
  return /** @type {!proto.tictactoe.v1.Turn} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.tictactoe.v1.Turn} value
 * @return {!proto.tictactoe.v1.ResponseBody} returns this
 */
proto.tictactoe.v1.ResponseBody.prototype.setTurn = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.tictactoe.v1.ResponseBody.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.tictactoe.v1.ResponseBody} returns this
 */
proto.tictactoe.v1.ResponseBody.prototype.clearTurn = function() {
  return jspb.Message.setOneofField(this, 2, proto.tictactoe.v1.ResponseBody.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.tictactoe.v1.ResponseBody.prototype.hasTurn = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Result result = 3;
 * @return {!proto.tictactoe.v1.Result}
 */
proto.tictactoe.v1.ResponseBody.prototype.getResult = function() {
  return /** @type {!proto.tictactoe.v1.Result} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.tictactoe.v1.Result} value
 * @return {!proto.tictactoe.v1.ResponseBody} returns this
 */
proto.tictactoe.v1.ResponseBody.prototype.setResult = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


