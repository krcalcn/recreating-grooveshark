const Album = require('./models/album');
const Artist = require('./models/artist');
const Genre = require('./models/genre');
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

async function main() {
  try {
    await db.artistDatabase.save([eloy, kingCrimson, pitbull]);
    await db.genreDatabase.save([rock, progressiveRock]);

    await db.songDatabase.save([song1, song2]);
    await db.songDatabase.insert(song3);
    const songs = await db.songDatabase.load();

    const ocean = new Album('Ocean', [songs[0].id], new Date());
    const inTheWakeOfPoseidon = new Album('In the Wake of Poseidon', [songs[1].id], new Date());
    await db.albumDatabase.save([ocean, inTheWakeOfPoseidon]);

    user.addSong(songs[0].id);
    user.addSong(songs[1].id);
    user2.addSong(songs[2].id);

    user.addToFavoriteSongs([songs[0].id, songs[1].id]);
    const newList = user.createList(user.id, 'Yeni Calma Listem', true);
    const newList2 = user.createList(user.id, 'Yeni Calma Listem2', true);
    await db.listDatabase.save([newList]);
    await db.listDatabase.insert([newList2]);
    user.addToFavoriteLists(newList.id);
    const songAddedNewList = await user.addToList(user.id, newList.id, [song1.id, song2.id]);
    await db.listDatabase.update(songAddedNewList);

    await db.broadcastDatabase.save([user.createBroadcast(user.id, 'Prog Rock Yayını', false, true, [songs[0].id, songs[1].id])]);
    await db.userDatabase.save([user, user2]);

    // const foundById = await db.listDatabase.findBy('id', newList.id);
    // await db.listDatabase.save([foundById]);
    const dbLoad = await db.listDatabase.load();
    console.log(dbLoad);
  } catch (e) {
    return console.log(e);
  }
}
main();

/**
 * TODO:
 * - Function removeFromQueue()
 * - File Uploading
 * - Audio Streaming
 * - Broadcast Sync Streaming
*/
