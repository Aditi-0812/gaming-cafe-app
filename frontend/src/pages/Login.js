import React, { useState } from "react";
import axios from "axios";

const API = "https://gaming-cafe-app-iofi.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Login 🎮</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;