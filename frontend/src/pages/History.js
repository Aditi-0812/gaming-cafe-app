import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="glow">📜 My Bookings</h1>

      <button
        className="button"
        onClick={() => window.location.href = "/dashboard"}
      >
        ⬅ Back to Dashboard
      </button>

      {bookings.length === 0 ? (
        <p>No bookings yet 🎮</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="card">
            <p><strong>Slot ID:</strong> {b.slotId}</p>
            <p><strong>Date:</strong> {b.date}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
