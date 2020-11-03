const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const songsRouter = require('./routes/songs');
const genresRouter = require('./routes/genres');
const artistsRouter = require('./routes/artists');
const indexRouter = require('./routes');
require('./mongo-connection');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'pug');

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/songs', songsRouter);
app.use('/genres', genresRouter);
app.use('/artists', artistsRouter);
app.use('/', indexRouter);

app.listen('3000', () => {
  console.log('server is running on 3000 port');
});
