const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  type: {
    type: String, // PS5 or PC
    required: true
  },

  time: {
    type: String, // e.g. 10AM-11AM
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Slot", slotSchema);