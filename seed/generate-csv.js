const fs = require("fs");
const csvWriter = require("csv-write-stream");
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const count = 1000; // 100 million records
const maxSongLength = 480; // in seconds

const lorem = new loremIpsum({
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const getRandomUserId = () => {
  return Math.floor(Math.random() * 1000000) + 1; // 1 million users
};

const getRandomSongId = () => {
  return Math.floor(Math.random() * 10000000) + 1; // 10 million users
};

const getRandomTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
};

const writer = csvWriter();
writer.pipe(fs.createWriteStream("./seed/data.csv"));

for (let i = 1; i <= count; i++) {
  const comment = {
    user_id: getRandomUserId(),
    song_id: getRandomSongId(),
    content: lorem.generateSentences(1),
    time_stamp: getRandomTimeStamp(maxSongLength),
  };
  writer.write(comment);
  if (i % 100 === 0) {
    console.log(`comment ${i} added to csv file`);
  }
}

writer.end();
