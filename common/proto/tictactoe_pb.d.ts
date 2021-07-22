// package: tictactoe.v1
// file: tictactoe.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Header extends jspb.Message { 
    getToken(): string;
    setToken(value: string): Header;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Header.AsObject;
    static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Header, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Header;
    static deserializeBinaryFromReader(message: Header, reader: jspb.BinaryReader): Header;
}

export namespace Header {
    export type AsObject = {
        token: string,
    }
}

export class RequestBody extends jspb.Message { 
    getMove(): number;
    setMove(value: number): RequestBody;
    getGameMode(): GameMode;
    setGameMode(value: GameMode): RequestBody;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestBody.AsObject;
    static toObject(includeInstance: boolean, msg: RequestBody): RequestBody.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestBody, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestBody;
    static deserializeBinaryFromReader(message: RequestBody, reader: jspb.BinaryReader): RequestBody;
}

export namespace RequestBody {
    export type AsObject = {
        move: number,
        gameMode: GameMode,
    }
}

export class ResponseBody extends jspb.Message { 

    hasMove(): boolean;
    clearMove(): void;
    getMove(): number;
    setMove(value: number): ResponseBody;

    hasTurn(): boolean;
    clearTurn(): void;
    getTurn(): Turn;
    setTurn(value: Turn): ResponseBody;
    getResult(): Result;
    setResult(value: Result): ResponseBody;

    getRespCase(): ResponseBody.RespCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResponseBody.AsObject;
    static toObject(includeInstance: boolean, msg: ResponseBody): ResponseBody.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResponseBody, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResponseBody;
    static deserializeBinaryFromReader(message: ResponseBody, reader: jspb.BinaryReader): ResponseBody;
}

export namespace ResponseBody {
    export type AsObject = {
        move: number,
        turn: Turn,
        result: Result,
    }

    export enum RespCase {
        RESP_NOT_SET = 0,
        MOVE = 1,
        TURN = 2,
    }

}

export class Request extends jspb.Message { 
    getEvent(): RequestEvent;
    setEvent(value: RequestEvent): Request;

    hasHeader(): boolean;
    clearHeader(): void;
    getHeader(): Header | undefined;
    setHeader(value?: Header): Request;

    hasBody(): boolean;
    clearBody(): void;
    getBody(): RequestBody | undefined;
    setBody(value?: RequestBody): Request;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
        event: RequestEvent,
        header?: Header.AsObject,
        body?: RequestBody.AsObject,
    }
}

export class Response extends jspb.Message { 
    getEvent(): ResponseEvent;
    setEvent(value: ResponseEvent): Response;

    hasHeader(): boolean;
    clearHeader(): void;
    getHeader(): Header | undefined;
    setHeader(value?: Header): Response;

    hasBody(): boolean;
    clearBody(): void;
    getBody(): ResponseBody | undefined;
    setBody(value?: ResponseBody): Response;
    getErrorMessage(): string;
    setErrorMessage(value: string): Response;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        event: ResponseEvent,
        header?: Header.AsObject,
        body?: ResponseBody.AsObject,
        errorMessage: string,
    }
}

export enum RequestEvent {
    REQUEST_EVENT_JOIN = 0,
    REQUEST_EVENT_MOVE = 1,
    REQUEST_EVENT_REMATCH = 2,
    REQUEST_EVENT_CLOSE = 3,
    REQUEST_EVENT_RESTART = 4,
}

export enum ResponseEvent {
    RESPONSE_EVENT_START = 0,
    RESPONSE_EVENT_MOVE = 1,
    RESPONSE_EVENT_END = 2,
    RESPONSE_EVENT_REMATCH_ACCEPTED = 3,
    RESPONSE_EVENT_ROOM_CREATED = 4,
    RESPONSE_EVENT_ROOM_CLOSED = 5,
    RESPONSE_EVENT_ERROR = 6,
}

export enum GameMode {
    MODE_SINGLE_PLAYER = 0,
    MODE_DOUBLE_PLAYER = 1,
}

export enum Result {
    RESULT_VICTORY = 0,
    RESULT_DEFEAT = 1,
    RESULT_DRAW = 2,
}

export enum Turn {
    PLAYER_ONE = 0,
    PLAYER_TWO = 1,
}
