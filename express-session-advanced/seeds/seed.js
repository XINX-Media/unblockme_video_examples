const { User } = require('../models')

const userData = require('./userData.json')

const seedDatabase = async () => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })
}

seedDatabase()