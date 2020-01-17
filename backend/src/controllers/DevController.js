const axios = require('axios') //axios faz chamadas para outras apis disponiveis

const Dev = require('../models/Dev')

const parseStringAsArray = require('../utils/parseStringAsArray')
//5 funcoes do controller
//index(mostrar uma lista de recursos no caso dev), 
//show(mostra um unico dev)
//store(armazenar)
//update(alterar dev)
//destroy(deletar dev)
module.exports = {
    async index(request, response){
        const devs = await Dev.find()
        return response.json(devs)
    },

    
    async store(request, response) { // o async significa que a funcção pode demorar para responder, pq a api pode demorar pra responder
        //cadastro dos devs
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username }) // procurando um registro no db com o nome do usuario
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`) // então usa-se o await para aguardar a api finalizar e deveolver uma resposta
            let { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs)

            //pegando a localização
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }



        return response.json(dev)
    },
    async update(){
        //implementar função para atualizar
    },
    async destroy(){
        //função para excluir os dados
    }
}