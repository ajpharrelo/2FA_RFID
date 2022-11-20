const express = require('express');
const client = require('./api/client')
const user = require('./api/user')
const web = express();

web.use(express.static('public'))
web.use(express.static('./node_modules/bulma/'))


web.use(express.urlencoded({extended: true}));

// Handle login
web.post('/login', (req, res) => {

    if(req.body.user && req.body.pass)
    {
        if(user.checkUser(req.body.user, req.body.pass) == true)
        {
            client.GetRFID("192.168.0.40", 80, (rfid) => {
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