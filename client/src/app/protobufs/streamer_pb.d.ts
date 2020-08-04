// package: 
// file: streamer.proto

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Milestone extends jspb.Message {
  getVolume(): number;
  setVolume(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Milestone.AsObject;
  static toObject(includeInstance: boolean, msg: Milestone): Milestone.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Milestone, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Milestone;
  static deserializeBinaryFromReader(message: Milestone, reader: jspb.BinaryReader): Milestone;
}

export namespace Milestone {
  export type AsObject = {
    volume: number,
  }
}

