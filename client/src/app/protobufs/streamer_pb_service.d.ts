// package: 
// file: streamer.proto

import * as streamer_pb from "./streamer_pb";
import {grpc} from "@improbable-eng/grpc-web";

type StreamerStreamMilestone = {
  readonly methodName: string;
  readonly service: typeof Streamer;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof streamer_pb.Empty;
  readonly responseType: typeof streamer_pb.Milestone;
};

export class Streamer {
  static readonly serviceName: string;
  static readonly StreamMilestone: StreamerStreamMilestone;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class StreamerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  streamMilestone(requestMessage: streamer_pb.Empty, metadata?: grpc.Metadata): ResponseStream<streamer_pb.Milestone>;
}

