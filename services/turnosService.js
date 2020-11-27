const axios = require('axios')

class turnosService {
    constructor(API_URL) {
        this.API_URL = API_URL
    }

    getSedeById = async (servicioId) => {
        const res = await axios.get(this.API_URL + 'getSedesDisp?servicioId=' + servicioId)
        return res.data[0].sede
    }

    getAllSedes = async () => {
        const arrID = [2964, 3149, 3137, 3126, 3125, 3154, 3161]
        let res, sedes = []

        for (let i = 0; i < arrID.length; i++) {
            res = await this.getSedeById(arrID[i])
            sedes.push(res)
        }

        return sedes
    }
}

module.exports = turnosService