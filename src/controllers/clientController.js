const {Client, Evolucion, Compromiso} = require("../db")

module.exports = {
    getClients: async () => {
        const clients = await Client.findAll({include: [
            { model: Evolucion },
            { model: Compromiso }
          ]})
        return clients
    },
    getClientId: async (data) => {
        const client = await Client.findOne({where:{
            id:data
        },
        include: [
            { model: Evolucion },
            { model: Compromiso }
        ]})
        return client
    },
    createClient: async (data) => {
        await Client.create(data)
        return "Creado con exito"
    },
    editClient: async (data) => {
        const client = await Client.findOne({where:{
            id: data.id
        }})
        if(client){
            for (const key in data) {
                    client[key] = data[key];
              }
            await client.save()
            return client
        }else return "No encontramos el usuario"
    },
    newEvolucion: async (data) => {
        const client = await Client.findByPk(data.clientId)
        const evolucion = await Evolucion.create(data)
        await client.addEvolucion(evolucion)
        return "Exitoso"
    },
    newCompromiso: async (data) => {
        const client = await Client.findByPk(data.clientId)
        const compromiso = await Compromiso.create(data)
        await client.addCompromiso(compromiso)
        return "Exitoso"
    },
    findConsen: async (id) => {
        const consen = await Compromiso.findByPk(id)
        return consen
    }
}