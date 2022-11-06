const express = require("express");
const Redis = require("redis");
const router = express.Router();
const User = require("../models/users");
var ObjectId = require("mongoose");

const client = Redis.createClient();
client.connect();

client.on("connect", () => console.log("OTOT Task E connected to Redis"));

client.on("error", (err) => console.error(`Redis Connection Error ${err}`));
//Getting all
router.get("/", async (req, res) => {
    try {
        const cache = await client.get("allUsers");
        if (cache) {
            console.log("Cache hit")
            const allUsers = JSON.parse(cache);
            res.status(200).json(allUsers);
        } else {
            const users = await User.find();
            client.setEx("allUsers", 3600, JSON.stringify(users));
            res.status(200).json(users);
            
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
