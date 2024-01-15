import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const loadProto = (path) => {
    const options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };
    const packageDefinition = protoLoader.loadSync(path, options);
    return grpc.loadPackageDefinition(packageDefinition);
}

const main = () => {
    const port = process.env.PORT || 50051;
    const healthProtoPath = './src/proto/health.proto';
    const healthService = loadProto(healthProtoPath);

    const server = new grpc.Server();
    server.addService(healthService.Health.service, {
        Check: (req, callback) => {
            callback(null, { status: 'SERVING' });
        }
    });

    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        console.log(`Server running and listening to ${port}`);
        server.start();
    });
};

main();
