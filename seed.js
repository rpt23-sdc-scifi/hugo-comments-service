const db = require('./db/index');
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const maxComments = 20000;
const maxSongLength = 480; // in seconds, how long song is

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4
  }
});

const randoUserId = () => {
  return Math.floor(Math.random() * 10) + 1;
}

const randoSongId = () => {
  return Math.floor(Math.random() * 100) + 1;
}

const randoTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
}

const seedComments = async () => {
  try {
    await db.dropCollection();
    for ( let i = 1; i <= maxComments; i++) {
      let tempComment = {
        user_id: randoUserId(),
        song_id: randoSongId(),
        content: lorem.generateSentences(1),
        time_stamp: randoTimeStamp(maxSongLength)
      }
      const result = await db.saveComment(tempComment);
      console.log(`comment ID '${result.comment_id}' added`);
    }
  } catch (err) {
    console.log(err);
  }

}

seedComments();

