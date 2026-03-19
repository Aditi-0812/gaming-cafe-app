import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      setUsers(res.data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="glow">🏆 Leaderboard</h1>

      {users.map((user, index) => (
        <div key={user._id} className="card">
          <h3>#{index + 1} {user.name}</h3>
          <p>Score: {user.score}</p>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;