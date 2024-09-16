async function getUserByUsername(username) {
    const user = await userModel.get({
        where: {
            username,
        },
    });

    return user;
}

async function insertUser(username, password) {
    const user = await userModel.create({
        data: {
            username,
            password,
        },
    });

    return user;
}

async function updateUser(id, data) {
    const user = await userModel.update({
        where: {
            id,
        },
        data,
    });

    return user;
}

module.exports = {
    getUserByUsername,
    insertUser,
    updateUser,
};