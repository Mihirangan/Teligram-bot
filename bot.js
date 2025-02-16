const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Keys
const TELEGRAM_BOT_TOKEN = "7984810905:AAEwravwNZml_TO8CzT26Qc3g8MDMhy1SnM";
const GEMINI_API_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$";

// Initialize APIs
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Handle messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    if (userMessage.startsWith('/start')) {
        bot.sendMessage(chatId, "Hello! I'm a Gemini AI bot. Ask me anything!");
        return;
    }

    try {
        const result = await model.generateContent(userMessage);
        const aiReply = result.response.text();
        bot.sendMessage(chatId, aiReply);
    } catch (error) {
        console.error("Error:", error);
        bot.sendMessage(chatId, "Oops! Something went wrong.");
    }
});

console.log("Bot is running...");
