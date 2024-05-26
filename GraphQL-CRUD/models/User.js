const { Schema, model } = require('mongoose');
const Post = require('./Post')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ]

    }
)

userSchema.pre('findOneAndDelete', async function (next) {
    console.log('pre hook');
    try {
        const user = await this.model.findOne(this.getQuery());
        if (user) {
            await Post.deleteMany({ userId: user._id });
        }
        next();
    } catch (err) {
        next(err);
    }
});

const User = model('User', userSchema)

module.exports = User