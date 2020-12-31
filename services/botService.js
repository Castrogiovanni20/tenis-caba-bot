class botService {

    generarCancha = async (sede) => {
        try {
              // Canchas disponibles
              bot.action('canchas-' + servicioIdSeleccionado + fechaSeleccionada, (ctx) => {
                  ctx.reply('🎾 Selecciona la cancha.',
                  Extra.HTML()
                  .markup((m) => {
                    let listMarkupsCancha = []      
              
                      sede.forEach(async (cancha) => {
                        listMarkupsCancha.push(m.callbackButton(cancha.sede.nombre, 'cancha-' + cancha.sede.nombre))

                        bot.action('cancha-' + cancha.sede.nombre, (ctx) => {
                          ctx.editMessageText(sede.nombre,
                           Extra.HTML()  
                             .markup(Markup.inlineKeyboard([
                               Markup.callbackButton(cancha.sede.nombre.toString(), 'turnos-2964-2021-01-10-2072'),
       
                             ], { columns : 1 })))
                       }) 
                      })
                  
                      return m.inlineKeyboard(listMarkupsCancha, { columns : 1 })
                  }))
              }) 
              console.log('pepe')
        } 
        catch (e) {
            console.log('algo salio mal')
        }
    }
}

module.exports = botService