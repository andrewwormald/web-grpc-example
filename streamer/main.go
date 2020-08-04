package main

import (
	"context"
	"flag"
	"log"
	"math/rand"
	"time"

	"grpcStreamer/server"
)

func main() {
	flag.Parse()
	ctx := context.Background()
	rand.Seed(time.Now().UnixNano())
	srv := server.New(ctx, server.WithAddress(":8080"))
	err := srv.ServeForever()
	if err != nil {
		log.Fatalln(err)
	}
}
