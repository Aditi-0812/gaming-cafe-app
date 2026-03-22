require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://gaming-cafe-app.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => console.log("Server running on 5000"));
app.use("/api/auth", require("./routes/authRoutes"));
const auth = require("./middleware/authMiddleware");

app.get("/api/protected", auth, (req, res) => {
  res.send("You accessed protected route 🔐");
});
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
const leaderboardRoutes = require("./routes/leaderboardRoutes");

app.use("/api/leaderboard", leaderboardRoutes);