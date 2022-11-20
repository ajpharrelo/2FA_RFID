const users = require('../users.json');

function checkID(uid, username, password)
{
    if(checkUser(username, password) == true)
    {
        const found = users.find(x => x.uid === uid && x.username === username && x.password === password);
        if(found)
            return true;
    
        return false
    }
}

function checkUser(username, password)
{
    const found = users.find(x => x.username === username);

    if(found)
    {
        if(found.password === password)
            return true;
        return false;
    }
    else
    {
        return false;
    }
}


module.exports = {
    checkID,
    checkUser

}