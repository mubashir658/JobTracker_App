import { STATUSES } from "../utils/constants";
import { getInputStyle } from "../utils/styles";

export default function JobModal({ modal, setModal, editing, form, setForm, onSave, theme }) {
  const inp = getInputStyle(theme);

  const handleSave = () => {
    if (!form.company || !form.role || !form.date) return alert("Fill company, role and date");
    onSave();
  };

  if (!modal) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "28px 28px", width: "100%", maxWidth: 440, boxSizing: "border-box" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: theme.txt, marginBottom: 20 }}>
          {editing ? "Edit Application" : "Add Application"}
        </div>

        {[["Company Name", "company", "e.g. Google"], ["Role / Position", "role", "e.g. SDE Intern"], ["Date Applied", "date", ""]].map(([label, key, ph]) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>{label}</div>
            <input 
              style={inp} 
              type={key === "date" ? "date" : "text"} 
              placeholder={ph} 
              value={form[key]} 
              onChange={e => setForm({ ...form, [key]: e.target.value })} 
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>Status</div>
          <select style={inp} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>Notes (optional)</div>
          <textarea 
            style={{ ...inp, height: 72, resize: "vertical" }} 
            placeholder="Interview feedback, salary discussed, etc." 
            value={form.notes} 
            onChange={e => setForm({ ...form, notes: e.target.value })} 
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button 
            onClick={() => setModal(false)} 
            style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 0", fontSize: 14, cursor: "pointer", color: theme.muted }}>
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            style={{ flex: 2, background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            {editing ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
