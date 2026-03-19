import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/slots");
      setSlots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBooking = async (slotId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          slotId,
          date: "2026-03-18"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Booked 🎮");
      fetchSlots();

    } catch (err) {
      alert("Booking Failed ❌");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="glow">🎮 Gaming Arena</h1>

      <button className="button" onClick={() => window.location.href="/history"}>
        My Bookings 📜
      </button>

      <button className="button" onClick={() => window.location.href="/leaderboard"}>
        Leaderboard 🏆
      </button>

      {slots.map((slot) => (
        <div key={slot._id} className="card">
          <h3>{slot.type}</h3>
          <p>{slot.startTime} - {slot.endTime}</p>
          <p>₹{slot.price}</p>

          {slot.isBooked ? (
            <button className="button" disabled>
              Booked ❌
            </button>
          ) : (
            <button className="button" onClick={() => handleBooking(slot._id)}>
              Book Slot 🎮
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
