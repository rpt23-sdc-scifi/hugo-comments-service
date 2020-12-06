const fs = require("fs");
const csvWriter = require("csv-write-stream");
const loremIpsum = require("lorem-ipsum").LoremIpsum;

// In primary "comments" table, generate 100 million records
// In referenced "songs" table, generate 10 million records
// In referenced "users" table, generate 10 million users
// In referenced "content" table, generate 100 million records

// Each table corresponds to a CSV file

const maxSongLength = 480; // in seconds

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const getRandomUserId = (max) => {
  return Math.floor(Math.random() * max) + 1; // 10 million users
};

const getRandomSongId = (max) => {
  return Math.floor(Math.random() * max) + 1; // 10 million songs
};

const getRandomContentId = (max) => {
  return Math.floor(Math.random() * max) + 1; // 100 million text comments
};

const getRandomTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
};

// adding the option {flags: "a"} to writer.pipe means it will append instead of overwriting it; "w" is the default overwrite

const generateCommentsCSV = async (count, startId = 1) => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./seed/data/comments.csv", {flags: "a"}));

  for (let i = startId; i <= count + startId; i++) {
    console.log(`adding comment ${i}`);

    const user_id = getRandomUserId(count / 10);
    const song_id = getRandomSongId(count / 10);
    const content_id = getRandomContentId(count);
    const time_stamp = getRandomTimeStamp(maxSongLength);

    await writer.write({
      comment_id: i,
      user_id,
      song_id,
      content_id,
      time_stamp,
    });
  }

  await writer.end();
};

const generateUsersCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./seed/data/users.csv"));

  for (let i = 1; i <= count / 10; i++) {
    console.log(`adding user ${i}`);

    await writer.write({
      user_id: i,
      system_number: getRandomUserId(),
    });
  }

  await writer.end();
};

const generateSongsCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./seed/data/songs.csv"));

  for (let i = 1; i <= count / 10; i++) {
    console.log(`adding song ${i}`);

    await writer.write({
      song_id: i,
      system_number: getRandomSongId(),
    });
  }

  await writer.end();
};

const generateContentCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./seed/data/content.csv"));

  for (let i = 1; i <= count; i++) {
    console.log(`adding content ${i}`);

    await writer.write({
      content_id: i,
      text: lorem.generateSentences(1),
    });
  }

  await writer.end();
};

const generateCSVFiles = async () => {
  await generateCommentsCSV();
  await generateUsersCSV();
  await generateSongsCSV();
  await generateContentCSV();
};

const count = 1000; // number of comments

generateCommentsCSV(count, 1);
