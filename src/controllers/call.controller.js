import callService from "../services/call.service.js";

const callController = {
    webhookIncoming: async (request, reply) => {
        const TwiML = await callService.getVideoCallTwiML();

        reply.type('text/xml');
        reply.send(TwiML);
    },
    outbound: async (request, reply) => {
        const { sip, roomName } = request.body;

        const callSid = await callService.makeOutboundCall(sip, roomName);

        reply.code(200);
        reply.send({
            callSid
        })
    },
    webhookCallStatus: async (request, reply) => {
        console.log('webhookCallStatus',request.body);

        reply.code(200);
        reply.send("OK")
    },
    forceEndCall: async (request, reply) => {
        const { callSid } = request.body;

        await callService.forceEndCall(callSid);

        reply.code(200);
        reply.send("OK")
    }
}

export default callController;