const fs = require("fs");
const csvWriter = require("csv-write-stream");
const loremIpsum = require("lorem-ipsum").LoremIpsum;
const { finished } = require("stream/promises");
const { once } = require("events");

// In primary "comments" table, generate 100 million records
// In referenced "songs" table, generate 10 million records
// In referenced "users" table, generate 10 million users
// In referenced "content" table, generate 100 million records

// Each table corresponds to a CSV file

const commentsCount = 100000000;
const usersCount = 10000000;
const songsCount = 10000000;
const contentCount = 100000000;

const maxSongLength = 480; // in seconds

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const getRandomUserId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // range: 10 million users
};

const getRandomSongId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // range: 10 million songs
};

const getRandomContentId = () => {
  return Math.floor(Math.random() * 100000000) + 1; // range: 100 million text comments
};

const getRandomTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
};

// adding the option {flags: "a"} to writer.pipe means it will append instead of overwriting it; "w" is the default overwrite

const generateCommentsCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/comments.csv"));

  console.log(`adding ${commentsCount} comments...`);

  for (let i = 1; i <= commentsCount; i++) {
    const user_id = getRandomUserId();
    const song_id = getRandomSongId();
    const content_id = getRandomContentId();
    const time_stamp = getRandomTimeStamp(maxSongLength);

    const record = {
      user_id,
      song_id,
      content_id,
      time_stamp,
    };

    if (!writer.write(record)) {
      await once(writer, "drain");
    }
  }

  writer.end();
  await finished(writer);
  console.log("generateCommentsCSV() finished");
};

const generateUsersCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/users.csv"));

  console.log(`adding ${usersCount} users...`);

  for (let i = 1; i <= usersCount; i++) {
    const record = {
      system_number: getRandomUserId(),
    };

    if (!writer.write(record)) {
      await once(writer, "drain");
    }
  }

  writer.end();
  await finished(writer);
  console.log("generateUsersCSV() finished");
};

const generateSongsCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/songs.csv"));

  console.log(`adding ${songsCount} songs...`);

  for (let i = 1; i <= songsCount; i++) {
    const record = {
      system_number: getRandomSongId(),
    };

    if (!writer.write(record)) {
      await once(writer, "drain");
    }
  }

  writer.end();
  await finished(writer);
  console.log("generateSongsCSV() finished");
};

const generateContentCSV = async () => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/content.csv"));

  console.log(`adding ${contentCount} contents...`);

  for (let i = 1; i <= contentCount; i++) {
    const record = {
      text: lorem.generateSentences(1),
    };

    if (!writer.write(record)) {
      await once(writer, "drain");
    }
  }

  writer.end();
  await finished(writer);
  console.log("generateContentCSV() finished");
};

const generateCSVFiles = async () => {
  await generateCommentsCSV();
  await generateContentCSV();
  await generateUsersCSV();
  await generateSongsCSV();
};

generateCSVFiles();
