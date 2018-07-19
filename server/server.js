let net = require('net');
require('./packetModels.js');

let clients = [];
let givenIds = 0;

net.createServer(socket => {
    console.log('Client connected');
    let client = new require('./client.js');
    client.id = givenIds++;
    console.log('  ->  Gave Id ' + client.id);
    client.socket = socket;

    socket.on('end', client.end(client, clients));
    socket.on('error', client.error(client, clients));
    socket.on('data', client.data(client, clients));

    clients.push(client);
}).listen('20117');

console.log('Initialized');
/*setTimeout(() => {
    socksArray.forEach(x => x.write('bonjour'))
}, 1000)*/