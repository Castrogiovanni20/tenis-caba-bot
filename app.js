require('dotenv').config();
const { Telegraf, Markup } = require('telegraf')
const Extra = require('telegraf/extra')

const turnosService = require('./services/turnosService')
const turnosServiceInstance = new turnosService(process.env.API_URL)

const bot = new Telegraf(process.env.BOT_TOKEN)

/* bot.hears('Assalamualaikum', (ctx) => ctx.reply('Waalaikumsalam'))
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
}) */

bot.command('clubes', async (ctx) => {
  const sedes = await turnosServiceInstance.getAllSedes()

  ctx.reply('Selecciona un club para ver los turnos disponibles.',
    Extra.HTML()
    .markup((m) => {
      let listMarkups = []      
        let i = 0;

        sedes.forEach(async () => { 
            let sedeParseada = sedes[i].nombre.split("-").pop()
            listMarkups.push(m.callbackButton(sedeParseada, sedes[i].id))
            i++
        })
    
        return m.inlineKeyboard(listMarkups, { columns : 1 })
    }))
})

bot.action('2072', (ctx) => {
  ctx.editMessageText('<i>Parque Manuel Belgrano (ex KDT) </i>',
    Extra.HTML()  
    .markup(Markup.inlineKeyboard([
      Markup.callbackButton('Ver proximos turnos disponibles', 'turnos-2072'),
      Markup.callbackButton('Telefono', 'telefono-2072'),
      Markup.callbackButton('Direccion', 'direccion-2072'),
      Markup.callbackButton('Cantidad de canchas', 'canchas-2072')
    ], { columns : 1 })))
})

bot.action('2263', (ctx) => {
  ctx.editMessageText('<i>Polideportivo Colegiales </i>',
    Extra.HTML())
})

bot.action('2289', (ctx) => {
  ctx.editMessageText('<i>Polideportivo Onega </i>',
    Extra.HTML())
})

bot.action('2273', (ctx) => {
  ctx.editMessageText('<i>Polideportivo Pomar </i>',
    Extra.HTML())
})

bot.action('2255', (ctx) => {
  ctx.editMessageText('<i>Polideportivo Santojanni </i>',
    Extra.HTML())
})

bot.action('2270', (ctx) => {
  ctx.editMessageText('<i>Polideportivo Parque Patricios </i>',
    Extra.HTML())
})

bot.action('2299', (ctx) => {
  ctx.editMessageText('<i>Polideporito Don Pepe </i>',
    Extra.HTML())
})

bot.action('telefono-2072', (ctx) => {
  ctx.editMessageText('El telefono es 4807-7700')
})

bot.action('direccion-2072', (ctx) => {
  ctx.editMessageText('La direccion es SALGUERO, JERONIMO 3450')
  ctx.replyWithLocation(-34.572237, -58.400831)
})


bot.action('canchas-2072', (ctx) => {
  ctx.editMessageText('El club cuenta con 8 canchas de polvo de ladrillo.')
})
bot.launch()


/**
 * Auxiliar methods
 */
