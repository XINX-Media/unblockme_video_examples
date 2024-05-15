const router = require('express').Router();
const path = require('path');
const withAuth = require('../utils/auth');
const { User } = require('../models')

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
          attributes: { exclude: ['password'] },
          
        });
        const users = userData.map((user) => user.get({plain: true}))

        res.render('homepage', {
          loggedIn: req.session.loggedIn,
          email: req.session.email,
          users
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
        res.render('homepage')
      }
    
})
router.get('/login', (req, res) => {
    console.log('session object: ', req.session);
    res.render('loginSignup');
})



module.exports = router;