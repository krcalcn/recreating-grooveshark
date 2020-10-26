const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const songsRouter = require('./routes/songs');
const indexRouter = require('./routes');
require('./mongo-connection');

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/songs', songsRouter);
app.use('/', indexRouter);

app.listen('3000', () => {
  console.log('server is running on 3000 port');
});
