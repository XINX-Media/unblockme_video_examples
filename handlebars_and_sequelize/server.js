const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//import helpers
const helpers = require ('./utils/helpers')

const routes = require('./controllers');
const sequelize = require('./config/connection');

//instantiate session store (SequelizeStore)
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//add helpers to express-handlebars
const hbs = exphbs.create({ helpers });

// Set up sessions
const sessionOptions = {
  secret: process.env.SECRET, //a string that is used to incrypt the session id that gets stored as a cookie
  resave: true,
  saveUninitialized: true,
  cookie:{
    expires: 3600000 // one hour in milliseconds
  },
  //specify our session store and db type
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionOptions));

//specify handlebars as the engine for express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/*', (req, res) =>{
  res.render('404');
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
