const express = require('express');
const web = express();

web.use(express.static('public'))
web.use(express.static('./node_modules/bulma/'))


web.listen(3000);