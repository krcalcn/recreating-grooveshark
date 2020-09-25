const Album = require('./models/album');
const Artist = require('./models/artist');
const Broadcast = require('./models/broadcast');
const Genre = require('./models/genre');
const List = require('./models/list');
const Song = require('./models/song');
const User = require('./models/user');
// const albumDatabase = require('./database/album-database');
// const artistDatabase = require('./database/artist-database');
// const broadcastDatabase = require('./database/broadcast-database');
// const genreDatabase = require('./database/genre-database');
// const listDatabase = require('./database/list-database');
// const songDatabase = require('./database/song-database');
// const userDatabase = require('./database/user-database');
const database = require('./database');

console.log('-------------------------------------------------------------------------------------------------------------------------------------------');

const user = new User('ali', 'krcalcn', 'test@test.com', '1234');
const user2 = new User('can', 'kullaniciAdi', 'dummy@dummy.com', '1234');
const eloy = new Artist('Eloy');
const kingCrimson = new Artist('King Crimson');
const pitbull = new Artist('Pitbull');
const rock = new Genre('rock');
const progressiveRock = new Genre('progressive rock');

user2.followUser(user);

const song1 = new Song(
  'Poseidon`s Creation', // name
  402, // duration
  './sarki1.mp3', // url
  new Date(), // releaseDate
  user.id, // creatorUserId
  [eloy.id, pitbull.id], // artists
  [rock.id, progressiveRock.id], // genres
);
const song2 = new Song(
  'In the Wake of Poseidon',
  320,
  './sarki2.mp3',
  new Date(),
  user.id,
  [kingCrimson.id, pitbull.id],
  [rock.id, progressiveRock.id],
);
console.log(database);
database.songDatabase.save([song1, song2]);

const ocean = new Album('Ocean', [song1.id], new Date());
const inTheWakeOfPoseidon = new Album('In the Wake of Poseidon', [song2.id], new Date());

const addedSongs = user.addSong(song1.id);
const favSongs = user.addToFavoriteSongs([song1.id, song2.id]);
const newList = user.createList(user.id, 'Yeni Calma Listem', true);
const newList2 = user.createList(user.id, 'Yeni Calma Listem2', true);
user.saveList(newList.id);
user.addToFavoriteLists(newList.id);
database.listDatabase.save([newList]);

user.addToList(newList.id, user.savedSongs.map((i) => i));
// user.createBroadcast(user.id, 'Prog Rock Yayını', false, true, [song1.id, song2.id]);

database.userDatabase.save([user, user2]);
const foundById = database.listDatabase.findById(newList.id);
database.listDatabase.save(foundById);

// console.log(newList);
// console.log(foundById);
/**
 * TODO:
 * - Function freezeUserAccount()
 * - Database
 * - Function removeFromQueue()
 * - Function deletePlaylist()
 * - File Uploading
 * - Audio Streaming
 * - Broadcast Sync Streaming
*/
