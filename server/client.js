
module.exports = {
    x : 50,
    y : 50,
    id : -1,
    socket: null,

    data : function (client, clients) {
        return (data) => {
            console.log('Incoming:', data);
            let header = PacketModels.header.parse(data);
            console.log('[Interpreted : ' + header.command + ']');
        };
    },

    error : function (client, clients) {
        return (err) => {
            console.log('Client had an error', err);
            clients = clients.filter(goodClient => goodClient !== client);
        };
    },
    
    end : function (client, clients) {
        return () => {
            console.log('Disconnected');
            clients = clients.filter(goodClient => goodClient !== client);
        };
    }
}