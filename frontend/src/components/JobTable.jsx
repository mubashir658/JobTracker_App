import { STATUS_COLORS } from "../utils/constants";

export default function JobTable({ filtered, theme, onEdit, onDelete }) {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.border}`, background: theme.inputBg }}>
            {["Company", "Role", "Date Applied", "Status", "Notes", "Actions"].map(h => (
              <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: theme.muted, fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: theme.muted }}>No applications found. Add one!</td></tr>
          )}
          {filtered.map(job => {
            const sc = STATUS_COLORS[job.status];
            return (
              <tr key={job.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: 500, color: theme.txt }}>{job.company}</td>
                <td style={{ padding: "12px 16px", color: theme.muted }}>{job.role}</td>
                <td style={{ padding: "12px 16px", color: theme.muted }}>{job.date}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{job.status}</span>
                </td>
                <td style={{ padding: "12px 16px", color: theme.muted, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.notes || "—"}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button 
                      onClick={() => onEdit(job)} 
                      style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", color: theme.txt }}>
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(job.id)} 
                      style={{ background: "none", border: "1px solid #E24B4A", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", color: "#E24B4A" }}>
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
