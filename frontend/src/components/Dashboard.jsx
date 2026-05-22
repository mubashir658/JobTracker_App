import { getInputStyle } from "../utils/styles";
import { STATUSES } from "../utils/constants";
import JobTable from "./JobTable";

export default function Dashboard({ jobs, filtered, search, setSearch, filterStatus, setFilterStatus, onEdit, onDelete, onAdd, theme }) {
  const inp = getInputStyle(theme);

  const stats = {
    total: jobs.length,
    offer: jobs.filter(j => j.status === "Offer").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    rejected: jobs.filter(j => j.status === "Rejected").length,
    rate: jobs.length ? Math.round((jobs.filter(j => j.status !== "Applied" && j.status !== "Rejected").length / jobs.length) * 100) : 0,
  };

  return (
    <>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Applied", val: stats.total, color: "#534AB7" },
          { label: "Interviews", val: stats.interview, color: "#EF9F27" },
          { label: "Offers", val: stats.offer, color: "#639922" },
          { label: "Rejected", val: stats.rejected, color: "#E24B4A" },
          { label: "Response Rate", val: stats.rate + "%", color: "#1D9E75" },
        ].map(s => (
          <div key={s.label} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <input 
          style={{ ...inp, width: 200 }} 
          placeholder="🔍 Search company or role..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <select style={{ ...inp, width: 150 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>All</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button 
          onClick={onAdd} 
          style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", marginLeft: "auto" }}>
          + Add Application
        </button>
      </div>

      {/* Table */}
      <JobTable filtered={filtered} theme={theme} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
