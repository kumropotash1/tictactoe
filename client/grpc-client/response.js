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

goog.provide('proto.tictactoe.v1.Response');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.tictactoe.v1.Header');
goog.require('proto.tictactoe.v1.ResponseBody');

goog.forwardDeclare('proto.tictactoe.v1.ResponseEvent');
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
proto.tictactoe.v1.Response = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.tictactoe.v1.Response, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.tictactoe.v1.Response.displayName = 'proto.tictactoe.v1.Response';
}



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
proto.tictactoe.v1.Response.prototype.toObject = function(opt_includeInstance) {
  return proto.tictactoe.v1.Response.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tictactoe.v1.Response} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tictactoe.v1.Response.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: jspb.Message.getFieldWithDefault(msg, 1, 0),
    header: (f = msg.getHeader()) && proto.tictactoe.v1.Header.toObject(includeInstance, f),
    body: (f = msg.getBody()) && proto.tictactoe.v1.ResponseBody.toObject(includeInstance, f),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.tictactoe.v1.Response}
 */
proto.tictactoe.v1.Response.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tictactoe.v1.Response;
  return proto.tictactoe.v1.Response.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tictactoe.v1.Response} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tictactoe.v1.Response}
 */
proto.tictactoe.v1.Response.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.tictactoe.v1.ResponseEvent} */ (reader.readEnum());
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.tictactoe.v1.Header;
      reader.readMessage(value,proto.tictactoe.v1.Header.deserializeBinaryFromReader);
      msg.setHeader(value);
      break;
    case 3:
      var value = new proto.tictactoe.v1.ResponseBody;
      reader.readMessage(value,proto.tictactoe.v1.ResponseBody.deserializeBinaryFromReader);
      msg.setBody(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
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
proto.tictactoe.v1.Response.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tictactoe.v1.Response.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tictactoe.v1.Response} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tictactoe.v1.Response.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.tictactoe.v1.Header.serializeBinaryToWriter
    );
  }
  f = message.getBody();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.tictactoe.v1.ResponseBody.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional ResponseEvent event = 1;
 * @return {!proto.tictactoe.v1.ResponseEvent}
 */
proto.tictactoe.v1.Response.prototype.getEvent = function() {
  return /** @type {!proto.tictactoe.v1.ResponseEvent} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.tictactoe.v1.ResponseEvent} value
 * @return {!proto.tictactoe.v1.Response} returns this
 */
proto.tictactoe.v1.Response.prototype.setEvent = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional Header header = 2;
 * @return {?proto.tictactoe.v1.Header}
 */
proto.tictactoe.v1.Response.prototype.getHeader = function() {
  return /** @type{?proto.tictactoe.v1.Header} */ (
    jspb.Message.getWrapperField(this, proto.tictactoe.v1.Header, 2));
};


/**
 * @param {?proto.tictactoe.v1.Header|undefined} value
 * @return {!proto.tictactoe.v1.Response} returns this
*/
proto.tictactoe.v1.Response.prototype.setHeader = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.tictactoe.v1.Response} returns this
 */
proto.tictactoe.v1.Response.prototype.clearHeader = function() {
  return this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.tictactoe.v1.Response.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ResponseBody body = 3;
 * @return {?proto.tictactoe.v1.ResponseBody}
 */
proto.tictactoe.v1.Response.prototype.getBody = function() {
  return /** @type{?proto.tictactoe.v1.ResponseBody} */ (
    jspb.Message.getWrapperField(this, proto.tictactoe.v1.ResponseBody, 3));
};


/**
 * @param {?proto.tictactoe.v1.ResponseBody|undefined} value
 * @return {!proto.tictactoe.v1.Response} returns this
*/
proto.tictactoe.v1.Response.prototype.setBody = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.tictactoe.v1.Response} returns this
 */
proto.tictactoe.v1.Response.prototype.clearBody = function() {
  return this.setBody(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.tictactoe.v1.Response.prototype.hasBody = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string error_message = 4;
 * @return {string}
 */
proto.tictactoe.v1.Response.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.tictactoe.v1.Response} returns this
 */
proto.tictactoe.v1.Response.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


