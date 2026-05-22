import { getThemeColors } from "../utils/styles";

export default function Navbar({ user, page, setPage, onLogout, dark, setDark, theme }) {
  return (
    <div style={{ background: theme.card, borderBottom: `1px solid ${theme.border}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: theme.accent }}>💼 JobTracker</div>
        {["dashboard", "kanban"].map(p => (
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
              padding: "18px 4px", 
              textTransform: "capitalize" 
            }}>
            {p === "dashboard" ? "📊 Dashboard" : "🗂 Kanban"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
      </div>
    </div>
  );
}
