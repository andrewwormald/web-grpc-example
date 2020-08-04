package server

import (
	"context"
	"log"
	"math/rand"
	"net"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"

	pb "grpcStreamer/streamerpb"
)

var _ pb.StreamerServer = (*Server)(nil)

type Server struct {
	ctx  context.Context
	addr string
	tlsCert string
	tlsKey string

	mu            sync.Mutex
	httpServer    *http.Server
	grpcServer    *grpc.Server
	wrpGrpcServer *grpcweb.WrappedGrpcServer

	listener net.Listener
}

func New(ctx context.Context, opts ...Option) *Server {
	s := &Server{
		ctx:  ctx,
		mu:   sync.Mutex{},
		addr: ":8080",
	}

	for _, opt := range opts {
		opt(s)
	}

	return s
}

type Option func(s *Server)

func WithAddress(addr string) Option {
	return func(s *Server) {
		s.addr = addr
	}
}

func WithTLSCertFile(tlsCertPath string) Option {
	return func(s *Server) {
		s.tlsCert = tlsCertPath
	}
}

func WithTLSKeyFile(tlsKeyPath string) Option {
	return func(s *Server) {
		s.tlsKey = tlsKeyPath
	}
}

func (srv *Server) ServeForever() error {
	grpcServer := grpc.NewServer()

	srv.mu.Lock()
	srv.grpcServer = grpcServer
	srv.mu.Unlock()

	pb.RegisterStreamerServer(srv.grpcServer, srv)
	srv.wrpGrpcServer = grpcweb.WrapServer(grpcServer, grpcweb.WithOriginFunc(
		func(origin string) bool { return true }),
	)

	httpServer := http.Server{
		Addr:    ":8080",
		Handler: handler(srv.wrpGrpcServer),
	}

	return httpServer.ListenAndServe()
}

func (srv *Server) StreamMilestone(req *pb.Empty, m pb.Streamer_StreamMilestoneServer) error {
	resp := &pb.Milestone{
		Volume: 0,
	}

	for {
		resp.Volume += int64(rand.Intn(5000-100+1) + 100)
		err := m.SendMsg(resp)
		if err != nil {
			return err
		}
		if resp.Volume > 10000000 {
			return nil
		}
		log.Println("Sending new volume: " + strconv.FormatInt(resp.Volume, 10))
		time.Sleep(time.Second)
	}
}

func handler(srv *grpcweb.WrappedGrpcServer) http.Handler {
	return http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		if srv.IsGrpcWebRequest(req) {
			srv.ServeHTTP(resp, req)
		}

		if srv.IsAcceptableGrpcCorsRequest(req) {
			header := resp.Header()
			header.Add("Access-Control-Allow-Origin", "*")
			header.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
			header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-GRPC-WEB")
		}

		if req.Method == http.MethodOptions {
			resp.WriteHeader(http.StatusOK)
			return
		}

		http.DefaultServeMux.ServeHTTP(resp, req)
	})
}
