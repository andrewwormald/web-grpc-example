// package: 
// file: streamer.proto

var streamer_pb = require("./streamer_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Streamer = (function () {
  function Streamer() {}
  Streamer.serviceName = "Streamer";
  return Streamer;
}());

Streamer.StreamMilestone = {
  methodName: "StreamMilestone",
  service: Streamer,
  requestStream: false,
  responseStream: true,
  requestType: streamer_pb.Empty,
  responseType: streamer_pb.Milestone
};

exports.Streamer = Streamer;

function StreamerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

StreamerClient.prototype.streamMilestone = function streamMilestone(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Streamer.StreamMilestone, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.StreamerClient = StreamerClient;

