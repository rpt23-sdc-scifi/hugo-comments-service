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
// Note: the "csv-write-stream" module doesn't appear to use promises, so async/await doesn't work

const generateCommentsCSV = async (count) => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/comments-test.csv"));

  // console.log("readableHighWaterMark: ", writer.readableHighWaterMark);
  // console.log("writableHighWaterMark: ", writer.writableHighWaterMark);

  console.log(`adding ${count} comments... this may take a few minutes...`);

  for (let i = 1; i <= count; i++) {
    const user_id = getRandomUserId(10000000);
    const song_id = getRandomSongId(10000000);
    const content_id = getRandomContentId(100000000);
    const time_stamp = getRandomTimeStamp(maxSongLength);

    const record = {
      user_id,
      song_id,
      content_id,
      time_stamp,
    };

    // const result = writer.write(record);

    if (!writer.write(record)) {
      // console.log('buffer max reached: stream draining...');
      await new Promise((resolve) => writer.once("drain", resolve));
    }
  }

  writer.end();
};

const generateUsersCSV = (count) => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/users.csv"));

  console.log(`adding ${count} users... this may take a few minutes...`);

  for (let i = 1; i <= count / 10; i++) {
    writer.write({
      system_number: getRandomUserId(count / 10),
    });
  }

  writer.end();
};

const generateSongsCSV = (count) => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/songs.csv"));

  console.log(`adding ${count} songs... this may take a few minutes...`);

  for (let i = 1; i <= count / 10; i++) {
    writer.write({
      system_number: getRandomSongId(count / 10),
    });
  }

  writer.end();
};

const generateContentCSV = (count) => {
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream("./data/content-test.csv"));

  console.log(`adding ${count} contents... this may take a few minutes...`);

  for (let i = 1; i <= count; i++) {
    writer.write({
      text: lorem.generateSentences(1),
    });
  }

  writer.end();
};

// Because node is crashing if I try to write too many records at once, so I'm doing it in batches of 10 million every 5 minutes
// const writeInBatches = (writeFunction, count, iterations, currentBatch = 1) => {
//   writeFunction(count);
//   if (currentBatch === iterations) {
//     return;
//   }
//   setTimeout(() => {
//     write_to_csv_in_batches(count, iterations, currentBatch + 1);
//   }, 300000);
// };

// const count = 5; // number of comments

// writeInBatches(generateCommentsCSV, count, 1);

generateCommentsCSV(100000000);
