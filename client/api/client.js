const net = require('net')

function GetRFID(serverAddr, serverPort, callback)
{
    let client = net.createConnection({host: serverAddr, port: serverPort, keepAlive: true}, () => {

        client.on('ready', () => {
            client.write("READ");
        })

        client.on('data', (data) => {
            return callback(data.toString());
        })
 
    });
}

module.exports = {
    GetRFID
}
