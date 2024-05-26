const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    body: {
        type: String,
        required: true
    },

})

const Comment = model('Comment', commentSchema)

module.exports = Comment