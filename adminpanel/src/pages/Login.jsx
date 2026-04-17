import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://foodies-28.onrender.com/api/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE:", response.data); // 🔍 DEBUG

      // 🔥 HANDLE ALL POSSIBLE TOKEN KEYS
      const token =
        response.data.token ||
        response.data.jwt ||
        response.data.accessToken;

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", token);

      alert("Login successful ✅");

      // ✅ redirect to home
      window.location.href = "/";

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
