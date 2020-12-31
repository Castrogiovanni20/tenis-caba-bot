const { Telegraf, Markup } = require('telegraf')
const Extra = require('telegraf/extra')
const dayjs = require('dayjs')

class telegramService {
    constructor(turnosService, botService, bot_token) {
        this.turnosService = turnosService
        this.botService = botService
        this.bot_token = bot_token
    }

    startBot = async () => {
      try {
        const bot = new Telegraf(process.env.BOT_TOKEN)

        await this.setCommands(bot)
        await this.setActions(bot)

        console.log('Bot running successfully')
        bot.launch()

      } catch (error) {
        console.log("Something is wrong! " + error)
      }

    }

    setCommands = async (bot) => {
        try {
            bot.start((ctx) => ctx.reply('Este bot te va ayudar a consultar los turnos disponibles y obtener informacion de las canchas de tenis de los polideportivos de la Ciudad de Buenos Aires.\nEnviá /clubes para ver los clubes disponibles.', Extra.markup( Markup.keyboard(['/clubes', '/about']))))

            bot.command('about', (ctx) => {
              ctx.reply('Desarrollado por Ramiro Castrogiovanni')
            })

            bot.command('clubes', async (ctx) => {
                const sedes = await this.turnosService.getAllSedes()
              
                ctx.reply('Selecciona un club para ver los turnos disponibles.',
                  Extra.HTML()
                  .markup((m) => {
                    let listMarkups = []      
              
                      sedes.forEach(async (sede) => { 
                          listMarkups.push(m.callbackButton(sede.nombre, sede[0].sede.id))
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
              let turnos = await this.turnosService.getProximosTurnos(sede.servicioId)
              let clubSeleccionado = sede.nombre
              let servicioIdSeleccionado = sede.servicioId
              let fechaSeleccionada = ''

             // Nombre
              bot.action(sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText(sede.nombre,
                Extra.HTML()  
                  .markup(Markup.inlineKeyboard([
                    Markup.callbackButton('Ver proximos turnos disponibles', 'turnos-' + servicioIdSeleccionado),
                    Markup.callbackButton('Direccion', 'direccion-' + sede[0].sede.id.toString()),
                    Markup.callbackButton('Telefono', 'telefono-' + sede[0].sede.id.toString()),
                    Markup.callbackButton('Cantidad de canchas', 'canchas-' + sede[0].sede.id.toString())
                  ], { columns : 1 })))
              })
              
              // Turnos disponibles
              bot.action('turnos-' + servicioIdSeleccionado, (ctx) => {
                ctx.editMessageText('Estos son los proximos turnos disponibles: ',
                Extra.HTML()
                .markup((m) => {
                  let listMarkups = []      
            
                  turnos.forEach(async (turno) => {
                      fechaSeleccionada = turno
                      listMarkups.push(m.callbackButton(turno, 'canchas-' + servicioIdSeleccionado + fechaSeleccionada))
                      
                      bot.action('canchas-' + servicioIdSeleccionado + fechaSeleccionada, (ctx) => {
                        ctx.reply('Selecciona la cancha.',
                        Extra.HTML()
                        .markup((m) => {
                          let listMarkupsCancha = []      
                    
                            sede.forEach(async (cancha) => {
                              let sedeIdSeleccionado = cancha.sede.id
                              
                              listMarkupsCancha.push(m.callbackButton(cancha.sede.nombre, 'cancha-' + servicioIdSeleccionado + fechaSeleccionada + sedeIdSeleccionado))
                              let horasDisponibles = await this.turnosService.getHoraDisponibleByFecha(servicioIdSeleccionado, fechaSeleccionada, sedeIdSeleccionado)
                              bot.action('cancha-' + servicioIdSeleccionado + fechaSeleccionada + sedeIdSeleccionado, (ctx) => {
                                ctx.reply('Horario disponible: ' + horasDisponibles)
                             }) 
                            })
                        
                            return m.inlineKeyboard(listMarkupsCancha, { columns : 1 })
                        }))
                    }) 
                  })
                
                  return m.inlineKeyboard(listMarkups, { columns : 1 })}))
              })
                            
              // Turno disponible por cancha, fecha y hora
              bot.action('turnos-2964-2021-01-10-2072', (ctx) => {
                ctx.editMessageText('Horas disponibles: ',
                Extra.HTML()
                .markup((m) => {
                  let listMarkups = []      
            
                  turnos.forEach(async (turno) => { 
                        listMarkups.push(m.callbackButton(turno, 'canchas-' + sede.servicioId))
                  })
                
                  return m.inlineKeyboard(listMarkups, { columns : 1 })}))
              })


const run = async () => {
  for(const turno of turnos){
    let horas = await this.turnosService.getHoraDisponibleByFecha(sede.servicioId, '2021-01-03', sede[0].sede.id)
    bot.action('turno-' + sede[0].sede.id.toString() + turno, (ctx) => {
      ctx.editMessageText('Disponible en los siguientes horarios: ' + horas)
      console.log(horas)
    })
  }
  console.log("Done!");
}

run();

              /* turnos.forEach(async (turno) => {

                bot.action('turno-' + sede[0].sede.id.toString() + turno, (ctx) => {
                  let horas = await this.turnosService.getHoraDisponibleByFecha(sede[0].sede.servicioId, turno, sede[0].sede.id)
                  console.log(horas)
                  ctx.editMessageText('aca muestro las horas')
                })
              })  */

              /* for(const turno of turnos){
                let horas = await this.turnosService.getHoraDisponibleByFecha('2964', turno, '2072')
              } */
              
              // Direccion
              bot.action('direccion-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('La direccion es ' + sede[0].sede.direccion)
                ctx.replyWithLocation(sede[0].sede.latitud, sede[0].sede.longitud)
              })
          
              // Telefono
              bot.action('telefono-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('El telefono es ' + sede.telefono)
              })
          
              // Canchas
             /*  bot.action('canchas-' + sede[0].sede.id.toString(), (ctx) => {
                ctx.editMessageText('El club cuenta con ' + sede.length + ' cancha(s)')
              }) */ 
          
            });
        } 
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = telegramService