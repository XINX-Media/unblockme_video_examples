const path = require('path');
const express = require('express');
// Import express-session
const session = require('express-session');

const routes = require('./routes');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;
// Set up sessions
const sessionOptions = {
  //secret: process.env.SECRET, //a string that is used to incrypt the session id that gets stored as a cookie
  resave: true,
  saveUninitialized: true,
  cookie:{
    expires: 3600000 // one hour in milliseconds
  }
};

app.use(session(sessionOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/*', (req, res) =>{
  console.log('session object: ', req.session);
  res.sendFile(path.join(__dirname, '/public/404.html'));
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
