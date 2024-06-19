const webhook = require('webhook-discord');
const { DISCORD_MESSAGE_TYPES } = require('./constrain');
const Hook = new webhook.Webhook('//Sunucunuz>genel>entegrasyonlar>webhook URL buraya yapıştırılacak');
async function sendMessageToDiscord({ messageType, message }) {
    switch (messageType) {
        case DISCORD_MESSAGE_TYPES.SUCCESS:
            Hook.success('Ötüken Bot', message);
            break;
        case DISCORD_MESSAGE_TYPES.WARN: 
            Hook.warn('Ötüken Bot', message);
            break;
        case DISCORD_MESSAGE_TYPES.ERROR:
            Hook.err('Ötüken Bot', message);
            break;
        case DISCORD_MESSAGE_TYPES.INFO:
            Hook.info('Ötüken Bot', message);
            break;
        default:
            break;
    }
}

module.exports = {
    sendMessageToDiscord,
};
