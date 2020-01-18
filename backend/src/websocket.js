const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')
const connections = []

let io
exports.setupWebSocket = (server) => {
    console.log('OKs')
    const io = socketio(server)

    io.on('connection', socket => {
        console.log('id:' + socket.id)
        console.log('Params' + socket.handshake.query) // mostrando os parametros que estao sendo enviado do front-end

        const { latitude, longitude, techs } = socket.handshake.query; //pegando a latitude e longitude do socket.handleshake.query

        //setTimeout(() => { //depois de 3 segundos vai emitir uma mensagem para o socket
        //  socket.emit('message', 'Hello Omnistack')
        //},3000)
        connections.push({ // salvando as conexões
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })

    }) // toda vez que o usuário se logar via protocolo websocket
}  // fazendo as configurações pro server aceitar as requisicoes

exports.findConnections = (coordinates, techs) => { // recebendo as coordenadas e techs do novos devs e retornar todas as conexões que estão a 10km
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) <10 // comparando as coordenadas do novo dev cadastrado com as coordenadas armazenadas em cada uma das conexões
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => { // percorrendo destinatarios e mandando msg pro socket id
        io.to(connection.id).emit(message, data)
    })
}