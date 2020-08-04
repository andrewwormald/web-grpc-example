# web-grpc-example
An example of using improbable's grpc web js and ts packages/modules with their Go gRPC server wrapper. In this example the server streams back an accumulation value (the incrementation amount is random) to the web client and using angulars template binding we update the value in the dom as the new value comes in.


## Instructions

1) cd client && npm i
2) ng serve
3) ../streamer && go mod tidy
4) go run main.go 
