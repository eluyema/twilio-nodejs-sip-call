import callController from "../controllers/call.controller.js";

const callRouter = (fastify, _, done) => {  
    fastify.post("/webhook", callController.webhook);
    fastify.post("/outbound", callController.outbound);
  
    done();
};

export default callRouter;