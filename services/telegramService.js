const { Telegraf, Markup } = require('telegraf')
const Extra = require('telegraf/extra')

class telegramService {
    constructor(turnosService, bot_token) {
        this.turnosService = turnosService
        this.bot_token = bot_token
    }

    startBot = async () => {
        const bot = new Telegraf(process.env.BOT_TOKEN)

        await this.setCommands(bot)
        await this.setActions(bot)

        bot.launch()
    }

    setCommands = async (bot) => {
        try {
            bot.command('clubes', async (ctx) => {
                const sedes = await this.turnosService.getAllSedes()
              
                ctx.reply('Selecciona un club para ver los turnos disponibles.',
                  Extra.HTML()
                  .markup((m) => {
                    let listMarkups = []      
              
                      sedes.forEach(async (sede) => { 
                          listMarkups.push(m.callbackButton(sede[0].sede.nombre, sede[0].sede.id))
                      })
                  
                      return m.inlineKeyboard(listMarkups, { columns : 1 })
                  }))
            })
        } 
        catch (e) {
            console.log(e)
        }
    }


    setActions = async (bot) => {
        try {
            const sedes = await this.turnosService.getAllSedes()

            sedes.forEach(async (sede) => {
          
             // Nombre
              bot.action(sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText(sede[0].sede.nombre,
                Extra.HTML()  
                  .markup(Markup.inlineKeyboard([
                    Markup.callbackButton('Ver proximos turnos disponibles', 'turnos-' + sede[0].sede.id.toString()),
                    Markup.callbackButton('Direccion', 'direccion-' + sede[0].sede.id.toString()),
                    Markup.callbackButton('Telefono', 'telefono-' + sede[0].sede.id.toString()),
                    Markup.callbackButton('Cantidad de canchas', 'canchas-' + sede[0].sede.id.toString())
                  ], { columns : 1 })))
              })
          
              // Direccion
              bot.action('direccion-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('La direccion es ' + sede[0].sede.direccion)
                ctx.replyWithLocation(sede[0].sede.latitud, sede[0].sede.longitud)
              })
          
              // Telefono
              bot.action('telefono-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('El telefono es ' + sede[0].sede.telefono)
              })
          
              // Canchas
              bot.action('canchas-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('El club cuenta con ' + sede.length + ' cancha(s)')
              }) 
          
            });
        } 
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = telegramService