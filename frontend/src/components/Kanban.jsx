import { STATUSES, STATUS_COLORS } from "../utils/constants";

export default function Kanban({ jobs, theme, onEdit, onDelete, onMove, onAdd }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: theme.txt }}>Kanban Board</div>
        <button 
          onClick={onAdd} 
          style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          + Add Application
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {STATUSES.map(status => {
          const col = jobs.filter(j => j.status === status);
          const sc = STATUS_COLORS[status];
          return (
            <div key={status} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 14, minHeight: 200 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{status}</span>
                <span style={{ fontSize: 12, color: theme.muted }}>{col.length}</span>
              </div>
              {col.map(job => (
                <div key={job.id} style={{ background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: theme.txt }}>{job.company}</div>
                  <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{job.role}</div>
                  <div style={{ fontSize: 11, color: theme.muted, marginTop: 4 }}>{job.date}</div>
                  {job.notes && <div style={{ fontSize: 11, color: theme.muted, marginTop: 4, fontStyle: "italic" }}>"{job.notes}"</div>}
                  <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                    <button 
                      onClick={() => onMove(job.id, -1)} 
                      style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 5, padding: "3px 0", fontSize: 11, cursor: "pointer", color: theme.muted }}>
                      ◀
                    </button>
                    <button 
                      onClick={() => onEdit(job)} 
                      style={{ flex: 2, background: "none", border: `1px solid ${theme.border}`, borderRadius: 5, padding: "3px 0", fontSize: 11, cursor: "pointer", color: theme.txt }}>
                      Edit
                    </button>
                    <button 
                      onClick={() => onMove(job.id, 1)} 
                      style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: 5, padding: "3px 0", fontSize: 11, cursor: "pointer", color: theme.muted }}>
                      ▶
                    </button>
                  </div>
                </div>
              ))}
              {col.length === 0 && <div style={{ textAlign: "center", color: theme.muted, fontSize: 12, marginTop: 20 }}>No applications</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
