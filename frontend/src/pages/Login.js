import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      console.log(res.data);
      window.location.href = "/dashboard";

      localStorage.setItem("token", res.data.token);

    } catch (err) {
      alert("Login Failed ❌");
      console.log(err);
    }
  };

return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }}>
    <div className="card">
      <h2 className="glow">Login 🎮</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />

      <button className="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
);
}

export default Login;