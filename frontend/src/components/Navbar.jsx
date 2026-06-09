
import { useState, useEffect } from "react";

export default function Navbar({ user, page, setPage, onLogout, dark, setDark, theme }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ background: isMobile ? theme.card : theme.card, borderBottom: `1px solid ${theme.border}`, padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: theme.accent }}>💼 JobTracker</div>
        {!isMobile && (["dashboard", "kanban", "insights"].map(p => (
          <button 
            key={p} 
            onClick={() => setPage(p)}
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontSize: 13, 
              fontWeight: 500, 
              color: page === p ? theme.accent : theme.muted, 
              borderBottom: page === p ? `2px solid ${theme.accent}` : "2px solid transparent", 
              padding: "18px 4px"
            }}>
            {p === "dashboard" ? "📊 Dashboard" : p === "kanban" ? "🗂 Kanban" : "🤖 AI Insights"}
          </button>
        )))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
        {!isMobile && (
          <>
            <button 
              onClick={() => setDark(!dark)} 
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
              {dark ? "☀️" : "🌙"}
            </button>
            <div style={{ fontSize: 13, color: theme.muted }}>Hi, <b style={{ color: theme.txt }}>{user?.name}</b></div>
            <button 
              onClick={onLogout} 
              style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 12, color: theme.muted, cursor: "pointer" }}>
              Logout
            </button>
          </>
        )}

        {isMobile && (
          <>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>⋮</button>
            {menuOpen && (
              <div style={{ position: "absolute", right: 8, top: 56, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 8, padding: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                {[ ["dashboard","Dashboard"], ["kanban","Kanban"], ["insights","AI Insights"] ].map(([pKey,label]) => (
                  <div key={pKey} onClick={() => { setPage(pKey); setMenuOpen(false); }} style={{ padding: "8px 12px", cursor: "pointer", color: theme.txt }}>{label}</div>
                ))}
                <div style={{ height: 1, background: theme.border, margin: "6px 0" }} />
                <div onClick={() => { setDark(!dark); setMenuOpen(false); }} style={{ padding: "8px 12px", cursor: "pointer", color: theme.txt }}>{dark ? "Light" : "Dark"}</div>
                <div onClick={() => { onLogout(); setMenuOpen(false); }} style={{ padding: "8px 12px", cursor: "pointer", color: theme.txt }}>Logout</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
