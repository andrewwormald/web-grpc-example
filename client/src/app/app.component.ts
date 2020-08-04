import { Component } from '@angular/core';

import {grpc} from "@improbable-eng/grpc-web";
import {Streamer} from "./protobufs/streamer_pb_service";
import {Empty, Milestone} from "./protobufs/streamer_pb";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  volume: number = 0;

  constructor() {
    grpc.invoke(Streamer.StreamMilestone, {
      request: new Empty(),
      host: "http://localhost:8080",
      onHeaders: (headers: grpc.Metadata) => {
        console.log(headers)
      },
      onMessage: (message: Milestone) => {
        let milestone = message.toObject() as Milestone.AsObject
        this.volume = milestone.volume
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        if (code == grpc.Code.OK) {
          console.log("all ok")
        } else {
          console.log("hit an error", code, msg, trailers);
        }
      }
    });
  }
}
