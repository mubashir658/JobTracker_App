import { useState, useEffect } from "react";
import { STATUSES } from "./utils/constants";
import { getThemeColors } from "./utils/styles";
import { loadUser, saveUser, clearUser, loadJobs, saveJobs } from "./utils/storage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Kanban from "./components/Kanban";
import JobModal from "./components/JobModal";

const emptyJob = { company: "", role: "", date: "", status: "Applied", notes: "" };

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyJob);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Load user and jobs on mount
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUser(savedUser);
    }
    const savedJobs = loadJobs();
    setJobs(savedJobs);
  }, []);

  // Save jobs whenever they change
  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  const theme = getThemeColors(dark);

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    saveUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    clearUser();
    setPage("login");
  };

  // Job handlers
  const openAdd = () => {
    setEditing(null);
    setForm(emptyJob);
    setModal(true);
  };

  const openEdit = (job) => {
    setEditing(job.id);
    setForm({ ...job });
    setModal(true);
  };

  const saveJob = () => {
    if (editing) {
      setJobs(jobs.map(j => j.id === editing ? { ...form, id: editing } : j));
    } else {
      setJobs([...jobs, { ...form, id: Date.now() }]);
    }
    setModal(false);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const moveStatus = (id, dir) => {
    setJobs(jobs.map(j => {
      if (j.id !== id) return j;
      const idx = STATUSES.indexOf(j.status);
      const next = STATUSES[Math.min(Math.max(idx + dir, 0), STATUSES.length - 1)];
      return { ...j, status: next };
    }));
  };

  const filtered = jobs.filter(j =>
    (filterStatus === "All" || j.status === filterStatus) &&
    (j.company.toLowerCase().includes(search.toLowerCase()) || j.role.toLowerCase().includes(search.toLowerCase()))
  );

  // Show login if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} dark={dark} setDark={setDark} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.txt, fontFamily: "system-ui, sans-serif" }}>
      <Navbar 
        user={user} 
        page={page} 
        setPage={setPage} 
        onLogout={handleLogout} 
        dark={dark} 
        setDark={setDark}
        theme={theme}
      />

      <div style={{ padding: "24px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {page === "dashboard" && (
          <Dashboard
            jobs={jobs}
            filtered={filtered}
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onEdit={openEdit}
            onDelete={deleteJob}
            onAdd={openAdd}
            theme={theme}
          />
        )}

        {page === "kanban" && (
          <Kanban
            jobs={jobs}
            theme={theme}
            onEdit={openEdit}
            onDelete={deleteJob}
            onMove={moveStatus}
            onAdd={openAdd}
          />
        )}
      </div>

      <JobModal
        modal={modal}
        setModal={setModal}
        editing={editing}
        form={form}
        setForm={setForm}
        onSave={saveJob}
        theme={theme}
      />
    </div>
  );
}
