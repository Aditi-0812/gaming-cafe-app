import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://gaming-cafe-app-iofi.onrender.com";

function History() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/api/bookings`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>My Bookings 📜</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet 😅</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id}>
            Slot: {b.slotId} | Date: {b.date}
          </div>
        ))
      )}
    </div>
  );
}

export default History;
