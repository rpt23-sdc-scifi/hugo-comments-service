const db = require('./db/index');
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const maxComments = 100000000; // 100 million records
const maxSongLength = 480; // in seconds

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4
  }
});

const randoUserId = () => {
  return Math.floor(Math.random() * 1000000) + 1; // 1 million users
}

const randoSongId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // 10 million users
}

const randoTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
}

const seedComments = async () => {
  try {
    // await db.dropCollection();
    for ( let i = 1; i <= maxComments; i++) {
      let tempComment = {
        user_id: randoUserId(),
        song_id: randoSongId(),
        content: lorem.generateSentences(1),
        time_stamp: randoTimeStamp(maxSongLength)
      }
      await db.saveComment(tempComment);
      console.log(`comment ${i} added`);
    }
  } catch (err) {
    console.log(err);
  }

}

seedComments();
