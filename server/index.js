const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");
const keys = require("./keys");

const app = express();
app.use(cors());
app.use(express.json());


// PG Setup
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on("error", () => console.log("Lost PG connection"));
pgClient.on("connect", () => {
    pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log(err))
})


// Redis Setup
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})
const redisPublisher = redisClient.duplicate();


// Express Setup
app.get("/", (req, res) => {
    res.send("Hello!");
})

app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");
    res.send(values.rows);
})

// app.get("/values/current", async (req, res) => {
//     redisClient.hgetall("values", (err, values) => {
//         res.send(values);
//     })
// })

app.post("/values", async (req, res) => {
    const { index } = req.body;

    if (parseInt(index) > 40) return res.status(400).send("Index value too high!");

    redisClient.hset("values", index, "Nothing yet!");
    redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

    res.send({ working: true });
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on", port);
})