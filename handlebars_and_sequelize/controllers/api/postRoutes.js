const router = require('express').Router();
const { Post, User } = require('../../models');

// (/api/post)
//Create a new post
router.post('/', async (req, res) => {
    console.log('CREATE POST ROUTE')
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        if(!newPost){
            res.status(400).json({message: 'cound not create post'})
        }else{
            res.status(200).json(newPost);
        }
        
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});



module.exports = router;
