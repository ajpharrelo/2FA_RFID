const net = require('net')
const list = require('../users.json')

function GetRFID(serverAddr, serverPort, callback)
{
    let client = net.createConnection({host: serverAddr, port: serverPort, keepAlive: true}, () => {
        client.write("READ");
    
        client.on('data', (data) => {
            return callback(data.toString());
        })
    });
}

module.exports = {
    GetRFID
}
