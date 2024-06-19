const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

const DISCORD_TOKEN = 'DISCORD BOT TOKENI BURAYA YAPIŞTIRIN';
const HUGGING_FACE_API_KEY = 'HUGGINGFACE API YAPISTIRIN';

client.once('ready', () => {
    console.log('Bot is aktif!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; 

    const content = message.content.toLowerCase(); 

    if (content.startsWith('selam')) {
        await message.channel.send('Selam, size nasıl yardımcı olabilirim?');
    } else if (content.startsWith('soru sor')) {
        const userQuestion = message.content.slice(9).trim();
        if (userQuestion.length > 0) {
            const response = await getAIResponse(userQuestion);
            await message.channel.send(response);
        } else {
            await message.channel.send('Lütfen bir soru belirtin.');
        }
    }
});

async function getAIResponse(question) {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/openai-community/gpt2',
            {
                inputs: question
            },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.generated_text) {
            return `Cevap: ${response.data.generated_text}`;
        } else {
            return 'API yanıtında bir hata oluştu.';
        }
    } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error.response.data);
        return 'Maalesef, bir hata oluştu';
    }
}

client.login(DISCORD_TOKEN);
