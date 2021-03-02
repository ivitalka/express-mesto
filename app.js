const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('connected'));

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '603c81f77327503b8d1b11ed',
  };
  next();
});
app.use(bodyParser.json());
app.use('/', usersRouter, cardsRouter);

app.listen(PORT);
