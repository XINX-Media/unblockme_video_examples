const { getUserByUsername, insertUser, updateUser: updateUserModel } = require("../model/userModel");

async function createUser(username, password) {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const username = validateUsername(username);

    const newUser = await insertUser(username, password);

    return newUser;
}

async function updateUser(username, data) {
    const existingUser = await getUserByUsername(username);

    if (!existingUser) {
        throw new Error("User not found");
    }

    const newUser = await updateUserModel(existingUser.id, data);

    return newUser;
}

module.exports = {
    createUser,
    updateUser,
};