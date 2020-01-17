const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
module.exports = {
    async index(request, response) {
        console.log(request.query)
        //buscar todos os devs num raio de 10km
        //filtrar por tecnologias
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)
        
        const devs = await Dev.find({
            techs: {
                $in:techsArray,// dentro daquilo que é pedido no techs array
            },
            location:{
                $near: { // o near encontra objetos perto de uma localização
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance :10000,  // maximo  de distancia que quero encontrar o objeto
                }
            }
        })

        return response.json({ devs })
    }
}