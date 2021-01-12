const redis = require("redis");
const { promisify } = require("util");

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASS;

// redis in the dev environment doesn't have a password, must delete from options for connect to work
const options = password ? { host, password } : { host };

// Creating and connecting to redis client, either in development or production (default port is port 6379)
const client = redis.createClient(options);

// Redis connected
client.on("ready", (msg) => {
  console.log(`Connected to Redis at IP ${host}!`);
});

// Log Redis Errors
client.on("error", (err) => {
  console.log(err);
});

// Promisify redis client
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);
const exists = promisify(client.exists).bind(client);

module.exports = {
  get,
  set,
  del,
  exists,
};
