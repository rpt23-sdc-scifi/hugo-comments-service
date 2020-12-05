const fs = require("fs");
const csvWriter = require("csv-write-stream");
const loremIpsum = require("lorem-ipsum").LoremIpsum;

// In primary "comments" table, generate 100 million records
// In referenced "songs" table, generate 10 million records
// In referenced "users" table, generate 10 million users
// In referenced "content" table, generate 100 million records

// Each table corresponds to a CSV file

const count = 10; // number of comments
const maxSongLength = 480; // in seconds

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const getRandomUserId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // 10 million users
};

const getRandomSongId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // 10 million songs
};

const getRandomContentId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // 100 million text comments
};

const getRandomTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
};

const commentsWriter = csvWriter();
const usersWriter = csvWriter();
const songsWriter = csvWriter();
const contentWriter = csvWriter();

// adding the option {flags: "a"} means it will append instead of overwriting it; "w" is the default overwrite
commentsWriter.pipe(fs.createWriteStream("./seed/comments.csv"));
songsWriter.pipe(fs.createWriteStream("./seed/songs.csv"));
usersWriter.pipe(fs.createWriteStream("./seed/users.csv"));
contentWriter.pipe(fs.createWriteStream("./seed/content.csv"));

for (let i = 1; i <= count; i++) {
  const user_id = getRandomUserId();
  const song_id = getRandomSongId();
  const content_id = getRandomContentId();
  const text = lorem.generateSentences(1);
  const time_stamp = getRandomTimeStamp(maxSongLength);

  commentsWriter.write({
    comment_id: i,
    user_id,
    song_id,
    content_id,
    time_stamp,
  });

  usersWriter.write({
    user_id: i,
    system_number: user_id,
  });

  songsWriter.write({
    song_id: i,
    system_number: song_id,
  });

  contentWriter.write({
    content_id: i,
    text,
  });
}

commentsWriter.end();
usersWriter.end();
songsWriter.end();
contentWriter.end();
