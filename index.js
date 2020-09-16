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
const Follow = require('./models/follow');

console.log('-------------------------------------------------------------------------------------------------------------------------------------------');
const momnt = moment().format();

const usr = new User('ali', 'krcalcn', 'test@test.com', '1234');

usr.addSong('Poseidon`s Creation', '6:42', './sarki1.mp3', momnt, ['rock', 'alternative']);
usr.addSong('In the Wake of Poseidon', '5:42', './sarki2.mp3', momnt, ['rock', 'alternative']);
usr.addSong('Old and Wise', '4:57', './sarki3.mp3', momnt, ['rock', 'alternative']);

const newList = usr.createPlaylist('Yeni Calma Listem', true);

newList.addToList(...usr.Saved.songs.map((i) => i));

// console.log(usr, newList, newList.songs);
console.log(`${usr.name} kullanicisi ${newList.name} listesini olusturdu ve ${newList.songs} sarkilarini ekledi`);

/*
  TODO:
    - Function addSongToFavs()
    - Function addPlaylistToFavs()
    - Function addToQueue()
    - Function startBroadcast()
    - Function joinBroadCast()
    - Function followUser()
    - Function freezeUserAccount()
    - Database
    - Function removeFromQueue()
    - Function deletePlaylist()
    - File Uploading
    - Audio Streaming

*/
