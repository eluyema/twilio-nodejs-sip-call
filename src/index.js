import fastify from 'fastify';
import config from './configs/env.config.js';
import callRouter from './routes/call.js';
import formbodyParser from '@fastify/formbody'

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(formbodyParser)
    app.register(callRouter, { prefix: "/call" });
    return app;
  };

  const app = build({ logger: true });

  app.listen(config.fastify.port || 5000, "0.0.0.0", (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });