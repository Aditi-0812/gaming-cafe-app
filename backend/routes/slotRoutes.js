const express = require("express");
const router = express.Router();

const Slot = require("../models/Slot");

// ➕ Add Slot (Admin)
router.post("/add", async (req, res) => {
  try {
    const slot = new Slot({
      type: req.body.type,
      time: req.body.time,
      price: req.body.price
    });

    const savedSlot = await slot.save();
    res.json(savedSlot);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get All Slots
router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;