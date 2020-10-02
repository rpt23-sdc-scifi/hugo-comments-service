const commentDb = require('./db/index');
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const maxComments = Math.floor(Math.random() * 200) + 37;
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

for ( let i = 1; i <= maxComments; i++) {
  let tempComment = {
    comment_id: i,
    user_id: randoUserId(),
    song_id: randoSongId(),
    content: lorem.generateSentences(1),
    time_stamp: randoTimeStamp(maxSongLength)
  }

  commentDb.saveComment(tempComment)
  .then(comment => console.log(`comment '${comment.content}' added`))
  .catch(error => console.error(error.message));
}
