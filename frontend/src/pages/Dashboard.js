import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://gaming-cafe-app-iofi.onrender.com";

function Dashboard() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await axios.get(`${API}/api/slots`);
      setSlots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookSlot = async (slotId) => {
    try {
      await axios.post(
        `${API}/api/bookings`,
        {
          slotId,
          date: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Booking successful 🎮");
      fetchSlots();
    } catch (err) {
      alert(err.response?.data || "Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Available Slots 🎮</h2>

      {slots.map((slot) => (
        <div
          key={slot._id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{slot.name}</h3>
          <p>Price: ₹{slot.price}</p>

          {slot.isBooked ? (
            <button disabled>Booked ❌</button>
          ) : (
            <button onClick={() => bookSlot(slot._id)}>
              Book Slot 🎮
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
