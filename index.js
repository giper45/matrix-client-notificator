const sdk = require("matrix-bot-sdk");
require('dotenv').config();
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;
const redis = require('redis');
const redisEnabled = process.env.REDIS_MODE == 1 ? true : false;
const homeServer = process.env.MATRIX_HOMESERVER;
const accessToken = process.env.MATRIX_ACCESS_TOKEN;
const roomID = process.env.MATRIX_ROOM_ID;

const log = (message) => console.log(`[+] ${message}`)
const logErr = (message) => {
    console.log(`[-] ${message}`);
    process.exit(-1);
}

const usage = () => {
    console.log("Usage: node index.js <message>");
    process.exit(-1);
}

const redisStringConnection = (host, port) => `redis://${host}:${port}`

const matrixNotify = (message) => {
    const storage = new SimpleFsStorageProvider("bot.json");
    const client = new MatrixClient(homeServer, accessToken, storage);
    client.sendText(roomID, message);
    log("Message Sent!");
}

const redisListen = async () => {
    const redisHost = process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    const redisChannel = process.env.REDIS_CHANNEL_NOTIFICATION;
    const client = redis.createClient(redisStringConnection(redisHost, redisPort))
    client.on('error', (err) => logErr('Redis Client Error', err));
    await client.connect();
    const subscriber = client.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(redisChannel, (message) => {
        log(`Received a new message`);
        matrixNotify(message)
    });
}




const main = (async () => {
    if (redisEnabled) {
        log("Redis Mode enabled, listen for messages");
        await redisListen()
    } else {
        if (process.argv.length != 3)
            usage();
        matrixNotify(process.argv[2])

    }
})();