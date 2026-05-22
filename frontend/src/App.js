import { useState, useEffect, useCallback } from "react";
import { STATUSES } from "./utils/constants";
import { getThemeColors } from "./utils/styles";
import { loadUser, saveUser, clearUser } from "./utils/storage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Kanban from "./components/Kanban";
import JobModal from "./components/JobModal";
import AIInsights from "./components/AIInsights";

const emptyJob = { company: "", role: "", date: "", status: "Applied", notes: "" };
const API = process.env.REACT_APP_API_URL;

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyJob);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [insights, setInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState("");

  const fetchJobs = useCallback(async (tk) => {
    try {
      const res = await fetch(`${API}/jobs`, { headers: { Authorization: `Bearer ${tk}` } });
      const data = await res.json();
      if (res.ok) setJobs(data.map(j => ({ ...j, id: j._id })));
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  }, []);

  const fetchInsights = useCallback(async (tk) => {
    setInsightsLoading(true);
    setInsightsError("");
    try {
      const res = await fetch(`${API}/insights`, { headers: { Authorization: `Bearer ${tk}` } });
      const data = await res.json();
      if (res.ok) setInsights(data);
      else setInsightsError(data.message || "Failed to generate insights");
    } catch { setInsightsError("Cannot connect to server."); }
    setInsightsLoading(false);
  }, []);

  // Load user and jobs on mount
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser && savedUser.token) {
      setUser(savedUser);
      setToken(savedUser.token);
      fetchJobs(savedUser.token);
    }
  }, [fetchJobs]);

  useEffect(() => {
    if (page === "insights" && token && !insights) fetchInsights(token);
  }, [page, token, insights, fetchInsights]);

  const theme = getThemeColors(dark);

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setToken(userData.token);
    saveUser(userData);
    fetchJobs(userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setJobs([]);
    setInsights(null);
    clearUser();
    setPage("dashboard");
  };

  // Job handlers
  const openAdd = () => {
    setEditing(null);
    setForm(emptyJob);
    setModal(true);
  };

  const openEdit = (job) => {
    setEditing(job.id);
    const { id, ...formData } = job;
    setForm(formData);
    setModal(true);
  };

  const saveJob = async () => {
    if (editing) {
      try {
        const res = await fetch(`${API}/jobs/${editing}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(jobs.map(j => j.id === editing ? { ...data, id: data._id } : j));
          setInsights(null);
        } else {
          alert(data.message || "Failed to update job");
        }
      } catch {
        alert("Cannot connect to server.");
      }
    } else {
      try {
        const res = await fetch(`${API}/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          setJobs([...jobs, { ...data, id: data._id }]);
          setInsights(null);
        } else {
          alert(data.message || "Failed to add job");
        }
      } catch {
        alert("Cannot connect to server.");
      }
    }
    setModal(false);
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== id));
        setInsights(null);
      } else {
        alert(data.message || "Failed to delete job");
      }
    } catch {
      alert("Cannot connect to server.");
    }
  };

  const moveStatus = async (id, dir) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    const idx = STATUSES.indexOf(job.status);
    const next = STATUSES[Math.min(Math.max(idx + dir, 0), STATUSES.length - 1)];

    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...job, status: next })
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(jobs.map(j => j.id === id ? { ...data, id: data._id } : j));
        setInsights(null);
      } else {
        alert(data.message || "Failed to update job status");
      }
    } catch {
      alert("Cannot connect to server.");
    }
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

        {page === "insights" && (
          <AIInsights
            insights={insights}
            insightsLoading={insightsLoading}
            insightsError={insightsError}
            onRefresh={() => { setInsights(null); fetchInsights(token); }}
            theme={theme}
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
