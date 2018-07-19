let client_inst = new require('./client.js');
let net = require('net');
require('./packetModels.js');

let clients = {
    all: []
}
let givenIds = 0;

net.createServer(socket => {
    console.log('Client connected');
    let client = new client_inst();
    client.id = givenIds++;
    console.log('  ->  Gave Id ' + client.id);
    client.socket = socket;
    clients.all.forEach(c => {
        client.socket.write(`NEW ${c.id} ${c.x} ${c.y} ${c.name}\0`);
        console.log('populating...');
    })
    clients.all.push(client);

    socket.on('end', client.end(client, clients));
    socket.on('error', client.error(client, clients));
    socket.on('data', client.data(client, clients));

}).listen('20117');

console.log('Initialized');
/*setTimeout(() => {
    socksArray.forEach(x => x.write('bonjour'))
}, 1000)*/