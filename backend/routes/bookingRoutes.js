const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const auth = require("../middleware/authMiddleware"); // ✅ ADD THIS

// 🎮 BOOK SLOT
router.post("/", auth, async (req, res) => {
  try {
    const { slotId, date } = req.body;
    const userId = req.user.id;

    // 🔒 prevent double booking
    const existingBooking = await Booking.findOne({ slotId, date });

    if (existingBooking) {
      return res.status(400).send("Slot already booked");
    }

    const booking = new Booking({
      userId,
      slotId,
      date
    });

    await booking.save();

    await Slot.findByIdAndUpdate(slotId, { isBooked: true });

    res.json({ message: "Booking successful", booking });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error booking slot");
  }
});
// 📜 GET USER BOOKINGS
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching bookings");
  }
});
module.exports = router;