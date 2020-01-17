//rota é o endereço adicional depois do endereço principal 
//como por exemplo www.fernando.com/users --> no caso o user é a rota

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://fernando:fernando@cluster0-mgii7.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors()) // libera o acesso externo para todo tipo de aplicação
app.use(express.json()) // entender requisições do body em formato json
app.use(routes)
// Métodos HTTP: get, post, put, delete

//TIPOS DE PARMETOS
//Query params: request.query (Filtros, ordenação, paginação...) // get
//Route params: request.params (Usados para identificar um recurso na alteração ou remoção) put/delete 
//Body: request.body (Dados para criação ou alteração de registro)
//MongoDB (Não-Relacional), criar cluster database access, network acess 

app.post('/users/:id', (request, response) => {
    console.log(request.body)
    return response.json({ message: 'Hello Omnistack' })
}) // caminho que está sendo acessado só barra representa localhost:3333

app.listen(3333);