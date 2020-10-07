const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const indexRouter = require('./routes');

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/', indexRouter);

app.listen('3000', () => {
  console.log('server is running on 3000 port');
});
