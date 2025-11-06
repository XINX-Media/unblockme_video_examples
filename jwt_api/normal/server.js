require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const { initDb, UserModel } = require("../models");
const auth = require("../auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/user", async (req, res) => {
  const { username, password, phone, email } = req.body;

  const users = await UserModel.search({
    phone
  });

  if (users.length > 0) {
    res.status(400).send("Phone already exists");
    return;
  }

  await UserModel.insert({
    username,
    password,
    phone: phone || '',
    email: email || '',
  });

  res.status(200).end();
});

app.put("/user/phone", auth, async (req, res) => {
  const { phone } = req.body;

  await UserModel.update(req.user.id, {
    phone,
  });

  res.status(200).end();
});

app.put("/user/email", auth, async (req, res) => {
  const { email } = req.body;

  await UserModel.update(req.user.id, {
    email,
  });

  res.status(200).end();
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  const users = await UserModel.search({
    username,
    password,
  });

  if (users.length === 0) {
    res.status(404).end("Bad user");
    return;
  }

  const user = users[0];

  const token = jwt.sign({
    type: 'token',
    id: user.id,
  }, process.env.JWT_KEY);

  res.status(200).json({
    token,
  });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});