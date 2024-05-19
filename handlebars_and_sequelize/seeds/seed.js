const { User, Post } = require('../models')

const userData = require('./userData.json')
const postData = require('./postData.json')

const seedDatabase = async () => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })
    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    })
}

seedDatabase()