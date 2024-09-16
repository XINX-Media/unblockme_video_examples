const { Router } = require("express");
const { createUser, updateUser } = require("../../controller/userController");

const userRouter = new Router();

userRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = await createUser(username, password); 
        
        res.status(200).json({ user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

userRouter.put("/", async (req, res) => {
    try {
        const { username, data } = req.body;

        const newUser = await updateUser(username, data); 
        
        res.status(200).json({ user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

module.exports = userRouter;