const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');
const songsRouter = require('./routes/songs');
const genresRouter = require('./routes/genres');
const artistsRouter = require('./routes/artists');
// const indexRouter = require('./routes');
require('./mongo-connection');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/songs', songsRouter);
app.use('/genres', genresRouter);
app.use('/artists', artistsRouter);
// app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
