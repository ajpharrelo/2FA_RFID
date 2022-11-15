const net = require('net')

let client = net.createConnection({host: "192.168.0.40", port: 80}, () => {
    client.write("Message from client\n\r");
});
