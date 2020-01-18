import socketio from  'socket.io-client'

const socket = socketio('http://192.168.15.25:3333', {
    autoConnect: false // evita de fazer conexão automatica

})
function subscribeToNewDevs(subscribeFunction){ //fazendo com que o front ouca o evento e mostre o new dev na tela
    socket.on('new-dev', subscribeFunction)
}


function connect(latitude, longitude, techs){
    socket.io.opts.query = { // enviando  os parametros para o backend
        latitude,
        longitude, 
        techs
    }
    socket.connect()

    socket.on('message', text => {
        console.log(text)
    })
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}