require('dotenv').config();
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.hears('Assalamualaikum', (ctx) => ctx.reply('Waalaikumsalam'))
bot.hears('hello', (ctx) => {
  ctx.reply('<b>Hello</b>. <i>How are you today?</i>',
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
      Markup.callbackButton('Not bad', 'not bad'),
      Markup.callbackButton('All right', 'all right')
    ])))
})
bot.action('not bad', (ctx) => {
  ctx.editMessageText('<i>Have a nice day 😊</i>',
    Extra.HTML())
})
bot.action('all right', (ctx) => {
  ctx.editMessageText('<i>May happiness be with you 🙏</i>',
    Extra.HTML())
})
bot.launch()