const Album = require('./models/album');
const Artist = require('./models/artist');
const Broadcast = require('./models/broadcast');
const Genre = require('./models/genre');
const List = require('./models/list');
const Song = require('./models/song');
const User = require('./models/user');
const db = require('./database');

console.log('-------------------------------------------------------------------------------------------------------------------------------------------');

const user = new User(undefined, 'ali', 'krcalcn', 'test@test.com', '1234');
const user2 = new User(undefined, 'can', 'kullaniciAdi', 'dummy@dummy.com', '1234');
const eloy = new Artist('Eloy');
const kingCrimson = new Artist('King Crimson');
const pitbull = new Artist('Pitbull');
const rock = new Genre('rock');
const progressiveRock = new Genre('progressive rock');
db.artistDatabase.save([eloy, kingCrimson, pitbull]);
db.genreDatabase.save([rock, progressiveRock]);
user2.followUser(user);

const song1 = new Song(
  'Poseidon`s Creation',
  402,
  './sarki1.mp3',
  new Date(),
  user.id,
  undefined,
  [eloy.id, pitbull.id],
  [rock.id, progressiveRock.id],
);
const song2 = new Song(
  'In the Wake of Poseidon',
  320,
  './sarki2.mp3',
  new Date(),
  user.id,
  undefined,
  [kingCrimson.id, pitbull.id],
  [rock.id, progressiveRock.id],
);
const song3 = new Song(
  'test',
  110,
  './sarki3.mp3',
  new Date(),
  user.id,
  undefined,
  ['artist1', 'artist2'],
  ['genre1', 'genre2'],
);

db.songDatabase.save([song1, song2]);
db.songDatabase.insert(song3);
// console.log(db.songDatabase.load());
const songs = db.songDatabase.load();

const ocean = new Album('Ocean', [songs[0].id], new Date());
const inTheWakeOfPoseidon = new Album('In the Wake of Poseidon', [songs[1].id], new Date());
db.albumDatabase.save([ocean, inTheWakeOfPoseidon]);

// const t = db.albumDatabase.load();
// console.log(t[0].songs);
// console.log(db.albumDatabase.load());

user.addSong(songs[0].id);

// console.log(songs.map((e) => e.id));

user.addToFavoriteSongs([songs[0].id, songs[1].id]);
const newList = user.createList(user.id, 'Yeni Calma Listem', true);
user.saveList(newList.id);
user.addToFavoriteLists(newList.id);
db.listDatabase.save([newList]);

user.addToList(newList.id, user.savedSongs.map((i) => i));
db.broadcastDatabase.save(user.createBroadcast(user.id, 'Prog Rock Yayını', false, true, [songs[0].id, songs[1].id]));

db.userDatabase.save([user, user2]);
const foundById = db.listDatabase.findById(newList.id);
db.listDatabase.save(foundById);

/**
 * TODO:
 * - Function removeFromQueue()
 * - Function deletePlaylist()
 * - File Uploading
 * - Audio Streaming
 * - Broadcast Sync Streaming
*/
