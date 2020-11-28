require('dotenv').config();

const turnosService = require('./services/turnosService')
const turnosServiceInstance = new turnosService(process.env.API_URL)

const telegramService = require('./services/telegramService')
const telegramServiceInstance = new telegramService(turnosServiceInstance, process.env.BOT_TOKEN)

telegramServiceInstance.startBot()