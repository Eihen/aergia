import { Telegraf } from 'telegraf';
import { getTldr } from './tldr';

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('tldr', async (ctx) => {
  const params = ctx.message.text.split(' ');
  if (params.length < 2) {
    return ctx.reply('Usage: /tldr <command>', {reply_to_message_id: ctx.message.message_id});
  }
  const page = await getTldr(params[1]);
  return ctx.replyWithMarkdown(page, {reply_to_message_id: ctx.message.message_id});
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
