import express from 'express';
const app = express();
import {Telegraf} from "telegraf";
import {Configuration, OpenAIApi} from "openai"
import {config} from "dotenv";

config();

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(botToken);

bot.on("message", async (ctx) => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: ctx.update.message.text}],
  });

  ctx.reply(response.data.choices[0].message.content);
})

bot.launch().then();

app.listen("3000", () => {
  console.log(`Express server listening on port 3000`);
});