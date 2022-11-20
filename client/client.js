const net = require('net')
const list = require('./uid.json')

function checkID(uid)
{
    const found = list.find(x => x.uid === uid);
    if(found)
        return true;

    return false
}

let client = net.createConnection({host: "192.168.0.40", port: 80}, () => {
    client.write("READ");
});

// FIXME:
// checkID returning false when using data sent from ESP32 
// but returns true when using literal value

client.on('data', (data) => {
    if(checkID(data.toString()) == true)
    {
        console.log("Authorised UID scanned");
    }
    else
    {
        console.log("Unauthorised UID scanned");
    }
})

client.on('error', (err) => {
    console.log("Server error: " + err.message);
})