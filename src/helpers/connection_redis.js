const redis = require("redis");
const createError = require("http-errors");

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", function (error) {
  console.log("connected");
});
client.on("ready", function (error) {
  console.log("Redis to ready");
});

client.connect();

module.exports = client;
