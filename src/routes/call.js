import callController from "../controllers/call.controller.js";

const callRouter = (fastify, _, done) => {  
    fastify.post("/webhook/incoming", callController.webhookIncoming);
    fastify.post("/outbound", callController.outbound);
    fastify.post("/webhook/status", callController.webhookCallStatus);
    fastify.post('/end', callController.forceEndCall);
  
    done();
};

export default callRouter;