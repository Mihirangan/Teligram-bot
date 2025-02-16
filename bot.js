const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

// API Keys
const TELEGRAM_BOT_TOKEN = "7984810905:AAEwravwNZml_TO8CzT26Qc3g8MDMhy1SnM";
const OPENAI_API_KEY = "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";

// Initialize APIs
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Handle messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    if (userMessage.startsWith('/start')) {
        bot.sendMessage(chatId, "Hello! I'm an AI-powered bot. Ask me anything!");
        return;
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        });

        const aiReply = response.choices[0].message.content;
        bot.sendMessage(chatId, aiReply);
    } catch (error) {
        console.error("Error:", error);
        bot.sendMessage(chatId, "Oops! Something went wrong.");
    }
});

console.log("Bot is running...");
