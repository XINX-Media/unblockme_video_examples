const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log('session object: ', req.session);
    res.sendFile(path.join(__dirname, '../public/login.html'));
})
router.get('/home', (req, res) => {
    console.log('session object: ', req.session);
    if(req.session.loggedIn){
        res.sendFile(path.join(__dirname, '../public/home.html'));
    }else{
        res.sendFile(path.join(__dirname, '../public/notLoggedIn.html'));
    }
})



module.exports = router;