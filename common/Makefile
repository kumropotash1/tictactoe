.Phony: deps proto

deps:
	npm i

js-proto:
	npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:./proto \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ./proto \
    proto/*.proto

ts-proto:
	npx grpc_tools_node_protoc \
	--ts_out=./proto \
	-I ./proto \
	proto/*.proto

proto: js-proto ts-proto

grpc-client:
	protoc -I=common/proto tictactoe.proto --js_out=import_style=commonjs+dts:client/grpc-client --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:client/grpc-client