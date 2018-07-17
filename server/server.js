let net = require('net');

let socksArray = [];


net.createServer(socket => {
    console.log('socket connected');
    socket.on('end', () => {
        console.log('Disconnected');
    });
    socket.on('error', err => {
        throw err;
    });
    socket.on('data', x => {
        console.log('Incoming:', x);
        socksArray.filter(gs => gs !== socket).forEach(s => {
            s.write(x);
        })
    })
    socksArray.push(socket);
}).listen('20117');

console.log('Initialized');
setTimeout(() => {
    socksArray.forEach(x => x.write('bonjour'))
}, )