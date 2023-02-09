import * as dotenv from 'dotenv'
dotenv.config()

const config = {
    fastify: { port: Number(process.env.PORT) || 5000 },
    twilio: {
        accountSid:  process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
    }
}

export default config;
