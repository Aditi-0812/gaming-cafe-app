import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://gaming-cafe-app-iofi.onrender.com";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API}/api/leaderboard`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Leaderboard 🏆</h2>

      {users.length === 0 ? (
        <p>No users yet 😅</p>
      ) : (
        users.map((user, index) => (
          <div key={user._id}>
            {index + 1}. {user.name} - {user.score}
          </div>
        ))
      )}
    </div>
  );
}

export default Leaderboard;