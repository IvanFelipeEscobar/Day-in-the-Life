const express = require('express');
const routes = require('./controllers');
const sequelize = require(`./config/connection`)
// import sequelize connection

const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers })

const sess = {
  secret: process.env.SECRET,
  cookie: {
    expires: 22 * 60 * 1000 //session expires after 22 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));


app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then (() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});})
