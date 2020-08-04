protoc  --plugin=protoc-gen-ts="../client/node_modules/.bin/protoc-gen-ts" \
        --js_out="import_style=commonjs,binary:../client/src/app/protobufs" \
        --ts_out="service=grpc-web:../client/src/app/protobufs" \
        --go_out=plugins=grpc:../streamer/streamerpb \
        --proto_path=./ \
        ./streamer.proto
