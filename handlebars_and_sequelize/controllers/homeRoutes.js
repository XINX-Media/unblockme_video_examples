const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Post} = require('../models')

//homepage
router.get('/', withAuth, async (req, res) => {
  
  try{
    const userData = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    if(!userData){
      res.status(400).json({message: 'no users found'})
    }else{
      const users = userData.map((user) => {
        return user.get({plain: true})
      })
      res.render('homepage', {
        loggedIn: req.session.loggedIn,
        email: req.session.email,
        users
      });
    }  
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }

   
})

//login/Signup page
router.get('/login', (req, res) => {
    res.render('loginSignup');
})

//create post page
router.get('/createPost', withAuth, (req, res) => {
  res.render('createPost', {
    loggedIn: req.session.loggedIn,
    email: req.session.email,
  })
})

//view user's posts page
router.get('/user/:userId', async (req, res) => {
  try{
    const userData = await User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: {
        exclude: ['password']
      },
      include: {
        model: Post
      }
    })
    if(!userData){
      res.status(400).json({message: 'no user found'})
    }else{
      const user = userData.get({plain: true})
      res.render('userPosts',{
        loggedIn: req.session.loggedIn,
        email: req.session.email,
        user
      })
    }
  }catch(err){
    console(err)
    res.status(500).json(err)
  }

  
})



module.exports = router;