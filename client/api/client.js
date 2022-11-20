const net = require('net')
const list = require('../users.json')

function checkID(uid)
{
    const found = list.find(x => x.uid === uid);
    if(found)
        return true;

    return false
}

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
    checkID,
    GetRFID
}
