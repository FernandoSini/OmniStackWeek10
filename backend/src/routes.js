const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router()

//{} representa a desestruturação na hora de declarar uma variavel, vc importa só o que precisa do modulo

routes.get('/devs', DevController.index) //buscar info
routes.post('/devs',DevController.store)
routes.get('/search', SearchController.index)

module.exports = routes