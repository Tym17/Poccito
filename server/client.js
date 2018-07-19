
module.exports = function(){
    this.x = 50;
    this.y = 50;
    this.id = -1;
    this.socket = null;
    this.name = null;

    this.data = function (client, clients) {
        return (data) => {
            console.log('Incoming:', data);
            let header = PacketModels.header.parse(data);
            console.log('[Interpreted : ' + header.command + ']');
            let args = header.command.split(' ');

            switch (args[0].toUpperCase()) {
                case "HI":
                    client.socket.write(`HELLO ${client.id} ${client.x} ${client.y}`);
                    client.name = args[1];
                    console.log('Responded Hello');
                    let others = clients.all.filter(gc => gc !== client);
                    console.log(others);
                    others.forEach(o => {
                        o.socket.write(`NEW ${client.id} ${client.x} ${client.y} ${client.name}`);
                        console.log('Told others about the newbie');
                    });
            }
        };
    },

    this.error = function (client, clients) {
        return (err) => {
            console.log('Client had an error', err);
            clients = clients.all.filter(goodClient => goodClient !== client);
        };
    },
    
    this.end = function (client, clients) {
        return () => {
            console.log('Disconnected');
            clients = clients.all.filter(goodClient => goodClient !== client);
        };
    }
}