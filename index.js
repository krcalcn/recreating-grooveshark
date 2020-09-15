const moment = require('moment');
const Album = require('./models/album');
const Artist = require('./models/artist');
const Broadcast = require('./models/broadcast');
const Favorites = require('./models/favorites');
const Genre = require('./models/genre');
const List = require('./models/list');
const Saved = require('./models/saved');
const Song = require('./models/song');
const User = require('./models/user');

const eloy = new Song('Poseidon`s Creation', '6:42', './sarki1.mp3', moment().format(), ['rock', 'alternative']);
const crimson = new Song('In the Wake of Poseidon', '5:42', './sarki2.mp3', moment().format(), ['rock', 'alternative']);
const alanParsons = new Song('Old and Wise', '4:57', './sarki3.mp3', moment().format(), ['rock', 'alternative']);
const songs = [eloy.id, crimson.id, alanParsons.id];
const usr = new User('ali', 'krcalcn', 'test@test.com', '1234');
const newList = usr.createPlaylist('Yeni Calma Listem', true);
const songsAdded = newList.addToList(...songs);

console.log(`${usr.name} kullanicisi ${newList.name} listesini olusturdu ve${songsAdded.map((a) => ` ${a}`)} sarkilarini ekledi`);
newList.songs.map((s) => {
  console.log(s);
  return 0;
});
console.log(usr);
console.log(newList);
