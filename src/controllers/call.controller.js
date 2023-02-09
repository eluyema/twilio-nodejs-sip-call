import callService from "../services/call.service.js";

const callController = {
    webhook: async (request, reply) => {
        const TwiML = await callService.getVideoCallTwiML();

        reply.type('text/xml');
        reply.send(TwiML);
    },
    outbound: async (request, reply) => {
        const { sip, roomName } = request.body;

        await callService.makeOutboundCall(sip, roomName);

        reply.code(200);
        reply.send("OK")
    }
}

export default callController;