const { User, Post, Comment } = require('../models')


const resolvers = {
    Query: {
        //get all users
        users: async () => {
            return await User.find({})
            .populate({
                path: 'posts',
                populate: {
                    path: 'comments'
                }
            })
        }, 
        //get all posts
        posts: async () => {
            const posts =  await Post.find({})
            .populate('userId')
            .populate('comments');
            if(!posts){
                return {
                    message: 'no posts'
                }
            }
            return posts
        },
  
    },
    Mutation: {
        addUser: async (parent, args) => {
            const {username, email, password} = args
            return await User.create({username, email, password})
        },
        deleteUser: async (parent, args) => {
            const { _id } = args
            await User.findByIdAndDelete({_id})

        },
        addPost: async (parent, args) => {
            const {title, body, userId} = args
            const newPost = await Post.create({
                userId,
                title,
                body
            })
            const userPosting = await User.findByIdAndUpdate(userId, 
                {$push: {posts: newPost._id}}
            )
            return newPost
        },
        updatePost: async (parent, args) => {
            const updatedPost = await Post.findByIdAndUpdate(args._id, args, {new: true})
            return updatedPost
        },
        deletePost: async (parent, args) => {
            const { _id } = args
            await Post.findByIdAndDelete(_id)
        },
        addComment: async (parent, args) => {
            const { postId, body } = args
            const newComment = await Comment.create({
                postId,
                body
            })
            const post = await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })

            return newComment
        }

    }
}

module.exports = resolvers