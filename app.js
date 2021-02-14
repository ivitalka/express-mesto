const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter, cardsRouter);

app.listen(PORT);
