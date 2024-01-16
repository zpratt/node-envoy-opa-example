import fastify from 'fastify';
import process from "process";

const main = () => {
  const app = fastify({http2: true, logger: true});

  app.get('/health', (request, reply) => {
    reply.code(200).send({state: 'healthy'});
  });

  app.get('/validate/*', (request, reply) => {
    console.log(`authz request: ${JSON.stringify(request.body)}`);
    reply.code(200).send({state: 'healthy'});
  });

  app.post('/validate/*', (request, reply) => {
    reply.code(200).send({state: 'healthy'});
  });

  app.post('/', (request, reply) => {
    reply.code(200).send();
  });

  app.listen({host: '0.0.0.0', port: 3000}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });

  process.on('SIGTERM', () => {
    app.close(() => {
      console.log('shutting down');
    });
  });
};

main();
