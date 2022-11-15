const net = require('net')

let client = net.createConnection({host: "192.168.0.40", port: 80}, () => {
    client.write("READ");
});

client.on('data', (data) => {
    console.log(data.toString());
})

client.on('error', (err) => {
    console.log("Server error: " + err.message);
})