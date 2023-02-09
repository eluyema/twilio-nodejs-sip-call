import twilio from "twilio";
import config from "../configs/env.config.js";

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

const VoiceResponse = twilio.twiml.VoiceResponse;

const CLIENT_IDENTITY = `{"displayName":"Client"}`;

const ROOM_NAME = 'd8735bb0-ff6e-4bce-a501-47c4e2d642a3';


const callService = {
    getVideoCallTwiML: async function (roomName = ROOM_NAME)  {
        const response = new VoiceResponse();
        const connect = response.connect();
        connect.room({ participantIdentity: CLIENT_IDENTITY }, roomName);

        return response.toString();
    },
    forceEndCall: async function (callSid) {
        await client.calls(callSid).update({status: "completed" })
    },
    makeOutboundCall: async function (sip, roomName) {
        const twiml = await this.getVideoCallTwiML(roomName);

        const { sid: callSid } = await client.calls
            .create({
                twiml: twiml,
                statusCallback: config.twilio.webhookCallStatusUrl,
                statusCallbackEvent: ['queued', 'initiated', 'ringing', 'in-progress', 'completed', 'busy', 'failed', 'no-answer', 'answered'],
                statusCallbackMethod: "POST",
                to:   sip,
                from: "Client"
            });
        return callSid;
    }
};

export default callService;
