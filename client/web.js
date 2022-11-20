const express = require('express');
const client = require('./api/client')
const web = express();

web.use(express.static('public'))
web.use(express.static('./node_modules/bulma/'))


web.use(express.urlencoded({extended: true}));

// Handle login
web.post('/login', (req, res) => {

    if(req.body.user && req.body.pass)
    {
        client.GetRFID("192.168.0.40", 80, (rfid) => {
           return res.send(rfid);
        })
    }
    else
    {
        return res.send("Please enter all user details.");
    }
})


web.listen(3000);