const path = require("node:path");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../../proto/auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const grpcObj = grpc.loadPackageDefinition(packageDefinition);
const auth = grpcObj.auth;

const HOST = process.env.AUTH_SERVICE_HOST
const PORT = process.env.AUTH_GRPC_PORT;

const client = new auth.AuthService(`${HOST}:${PORT}`, grpc.credentials.createInsecure());

module.exports = client; 