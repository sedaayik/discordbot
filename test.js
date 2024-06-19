// test.js
const { sendMessageToDiscord } = require('./dc');
const { DISCORD_MESSAGE_TYPES } = require('./constrain');

async function test() {
    await sendMessageToDiscord({
        messageType: DISCORD_MESSAGE_TYPES.SUCCESS,
        message: 'KEMAL SARAÇ İLK DENEME '
    });
}

test();
