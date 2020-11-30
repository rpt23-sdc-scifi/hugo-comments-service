const fs = require("fs");
const csvWriter = require("csv-write-stream");
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const count = 6000000; // 6 / 10 million comments
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
  return Math.floor(Math.random() * 1000000) + 1; // 1 million songs
};

const getRandomTimeStamp = (maxTime) => {
  return Math.floor(Math.random() * maxTime);
};

const writer = csvWriter({ sendHeaders: false });

// adding the option {flags: "a"} means it will append instead of overwriting it; "w" is the default overwrite
writer.pipe(fs.createWriteStream("./seed/data.csv", {flags: "a"}));

for (let i = 1; i <= count; i++) {
  const comment = {
    user_id: getRandomUserId(),
    song_id: getRandomSongId(),
    content: lorem.generateSentences(1),
    time_stamp: getRandomTimeStamp(maxSongLength),
  };
  writer.write(comment);
}

writer.end();