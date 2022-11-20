const net = require('net')
const list = require('./users.json')

function checkID(uid)
{
    const found = list.find(x => x.uid === uid);
    if(found)
        return true;

    return false
}

// let client = net.createConnection({host: "192.168.0.40", port: 80, keepAlive: true}, () => {
//     client.write("READ");

//     client.on('data', (data) => {
//         if(checkID(data.toString()) == true)
//         {
//             console.log("Authorised UID scanned");
//         }
//         else
//         {
//             console.log("Unauthorised UID scanned");
//         }
//     })
    
//     client.on('error', (err) => {
//         console.log("Server error: " + err.message);
//     })
    
//     client.on('end', () => {
//         console.log("Disconnected from ESP32");
//     })
// });

