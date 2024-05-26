const { Schema, model } = require('mongoose');
const Comment = require('./Comment')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

postSchema.pre('findOneAndDelete', async function (next) {
    try {
        const post = await this.model.findOne(this.getQuery());
        if (post) {
            await Comment.deleteMany({ postId: post._id });
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Post = model('Post', postSchema)

module.exports = Post