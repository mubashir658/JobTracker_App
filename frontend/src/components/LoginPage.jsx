import { useState } from "react";
import { getThemeColors, getInputStyle } from "../utils/styles";

const API = process.env.REACT_APP_API_URL;

export default function LoginPage({ onLogin, dark, setDark }) {
  const theme = getThemeColors(dark);
  const [page, setPage] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const inp = getInputStyle(theme);

  const handleLogin = async () => {
    if (!form.email || !form.password) return alert("Fill all fields");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data);
        setForm({ name: "", email: "", password: "" });
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch {
      alert("Cannot connect to server.");
    }
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) return alert("Fill all fields");
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data);
        setForm({ name: "", email: "", password: "" });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch {
      alert("Cannot connect to server.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 400, boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: theme.txt }}>JobTracker</div>
          <div style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>
            {page === "login" ? "Welcome back!" : "Create your account"}
          </div>
        </div>

        {page === "signup" && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>Full Name</div>
            <input 
              style={inp} 
              placeholder="your name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>Email</div>
          <input 
            style={inp} 
            placeholder="you@email.com" 
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
          />
        </div>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>Password</div>
          <input 
            style={inp} 
            type="password" 
            placeholder="••••••••" 
            value={form.password} 
            onChange={e => setForm({ ...form, password: e.target.value })} 
          />
        </div>

        <button 
          onClick={page === "login" ? handleLogin : handleSignup}
          style={{ width: "100%", background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
          {page === "login" ? "Login" : "Sign Up"}
        </button>

        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: theme.muted }}>
          {page === "login" ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setPage(page === "login" ? "signup" : "login")}
            style={{ color: theme.accent, cursor: "pointer", fontWeight: 500 }}>
            {page === "login" ? "Sign Up" : "Login"}
          </span>
        </div>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button 
            onClick={() => setDark(!dark)} 
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
}
