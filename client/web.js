const express = require('express');
const client = require('./api/client')
const user = require('./api/user')
const web = express();

//ESP32 Setup
const ESP_SERVER_ADDR = "192.168.0.40";
const ESP_PORT = 80;

// Static files
web.use(express.static('public'))
web.use(express.static('./node_modules/bulma/'))


web.use(express.urlencoded({extended: true}));

// Handle login
web.post('/login', (req, res) => {

    if(req.body.user && req.body.pass)
    {
        if(user.checkUser(req.body.user, req.body.pass) == true)
        {
            client.GetRFID(ESP_SERVER_ADDR, ESP_PORT, (rfid) => {
                if(user.checkID(rfid, req.body.user, req.body.pass) == true)
                {
                    return res.redirect('/home.html')
                }
                else
                {
                    return res.redirect('/rfid_fail.html');
                }
             })
        }
        else
        {
            return res.redirect('/auth_fail.html');
        }
    }
    else
    {
        return res.redirect('/auth_fail.html');
    }
})


web.listen(3000);