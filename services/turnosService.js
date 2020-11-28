const axios = require('axios')

class turnosService {
    constructor(API_URL) {
        this.API_URL = API_URL
    }

    getSedeById = async (servicioId) => {
        const res = await axios.get(this.API_URL + 'getSedesDisp?servicioId=' + servicioId)

        if (servicioId == 2964){
            res.data[0].sede.nombre = 'Parque Manuel Belgrano (ex Kdt)'
        }

        res.data[0].sede.nombre = res.data[0].sede.nombre.split("-").pop()
        res.data[0].sede.telefono = this.getTelefonoById(res.data[0].sede.id)

        return res.data
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

    getTelefonoById = (id) => {
        var telefono

        switch (id) {
            case 2072:
                telefono = '4807-7700'
                break
            case 2263:
                telefono = '4555-7074'
                break
            case 2289:
                telefono = '4504-2711'
                break
            case 2273:
                telefono = '4568-0184'
                break
            case 2255:
                telefono = '4641-2462'
                break
            case 2270:
                telefono = '4911-4642'
                break
            case 2299:
                telefono = '4302-1618'
                break
        }

        return telefono
    }
}

module.exports = turnosService