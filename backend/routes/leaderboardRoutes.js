const express = require("express");
const router = express.Router();

const User = require("../models/User");

// 🏆 GET LEADERBOARD
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching leaderboard");
  }
});

module.exports = router;