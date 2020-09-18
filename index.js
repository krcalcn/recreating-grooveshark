const Album = require('./models/album');
const Artist = require('./models/artist');
const Broadcast = require('./models/broadcast');
const Genre = require('./models/genre');
const List = require('./models/list');
const Song = require('./models/song');
const User = require('./models/user');
const Follow = require('./models/follow');

console.log('-------------------------------------------------------------------------------------------------------------------------------------------');

const user = new User('ali', 'krcalcn', 'test@test.com', '1234');
const user2 = new User('can', 'kullaniciAdi', 'dummy@dummy.com', '1234');
const eloy = new Artist('Eloy');
const kingCrimson = new Artist('King Crimson');
const pitbull = new Artist('Pitbull');
const rock = new Genre('rock');
const progressiveRock = new Genre('progressive rock');

const follow1 = new Follow(user.id, user2.id);
const follow2 = new Follow(user2.id, user.id);

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

const ocean = new Album('Ocean', [song1.id], new Date());
const inTheWakeOfPoseidon = new Album('In the Wake of Poseidon', [song2.id], new Date());

const addedSongs = user.addSong(song1.id, song2.id);
const favSongs = user.favoriteSongs(song1.id, song2.id);
const newList = new List(user.id, 'Yeni Calma Listem', true);
user.savePlaylist(newList.id);
user.favoritePlaylist(newList.id);

newList.addToList(user.savedSongs.map((i) => i));

const broadcast = new Broadcast(user.id, 'Prog Rock Yayını', false, true, [song1.id, song2.id]);
user.startBroadcasting(broadcast);

console.log(`${user.name} kullanicisi ${newList.name} listesini olusturdu ve ${newList.songs} sarkilarini ekledi`);

console.log(`User: ${JSON.stringify(user, null, 2)}`);
console.log(`Follow: ${JSON.stringify(follow1, null, 2)}`);
console.log(`Broadcast: ${JSON.stringify(broadcast, null, 2)}`);

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
