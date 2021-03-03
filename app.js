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
    _id: '603f348379e34e6c87d2255e',
  };
  next();
});

app.use(bodyParser.json());
app.use('/', usersRouter, cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
app.listen(PORT);
