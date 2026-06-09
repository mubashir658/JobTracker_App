import { useState } from "react";

const FEATURES = [
  { icon: "📋", title: "Track Applications", desc: "Add and manage all your job applications in one place. Never lose track of where you applied." },
  { icon: "🗂️", title: "Kanban Board", desc: "Visualize your job hunt pipeline — Applied, Screening, Interview, Offer, Rejected — with drag-free status updates." },
  { icon: "🤖", title: "AI Insights", desc: "Powered by Google Gemini AI. Get a personalized health score and actionable tips based on your real application data." },
  { icon: "📊", title: "Analytics Dashboard", desc: "See your total applications, interview count, offer rate, and response rate all in one clean dashboard." },
  { icon: "🔐", title: "Secure Auth", desc: "Your data is private. JWT-based authentication with bcrypt password hashing keeps your account secure." },
  { icon: "🌙", title: "Dark / Light Mode", desc: "Easy on your eyes. Switch between dark and light themes based on your preference anytime." },
];

const STEPS = [
  { num: "01", title: "Sign Up Free", desc: "Create your account in seconds. No credit card needed." },
  { num: "02", title: "Add Applications", desc: "Log every job you apply to — company, role, date, and status." },
  { num: "03", title: "Track Progress", desc: "Move applications across stages as you get responses." },
  { num: "04", title: "Get AI Insights", desc: "Let Gemini AI analyze your data and suggest how to improve." },
];

const FEEDBACK_INIT = { name: "", email: "", type: "feature", message: "" };

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [feedback, setFeedback] = useState(FEEDBACK_INIT);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const d = dark;
  const bg = d ? "#0a0a0f" : "#f4f6fb";
  const card = d ? "#13131a" : "#ffffff";
  const card2 = d ? "#1a1a24" : "#f8f9fc";
  const border = d ? "#2a2a3a" : "#e5e8ef";
  const txt = d ? "#e8eaf0" : "#1a1a2e";
  const muted = d ? "#7878a0" : "#6b7280";
  const accent = "#6C63FF";
  const accentLight = d ? "#1e1b4b" : "#ede9fe";
  const inp = {
    background: card2, border: `1px solid ${border}`, borderRadius: 10,
    padding: "11px 14px", color: txt, fontSize: 14, width: "100%",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit"
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    if (!feedback.name || !feedback.email || !feedback.message) return;
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: txt, fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "all 0.2s" }}>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: d ? "rgba(10,10,15,0.92)" : "rgba(244,246,251,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>💼</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: accent }}>JobTracker</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["home", "features", "how-it-works", "feedback"].map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background: page === p ? accentLight : "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: page === p ? accent : muted, borderRadius: 8, padding: "6px 14px", textTransform: "capitalize", transition: "all 0.15s" }}>
              {p === "how-it-works" ? "How It Works" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} style={{ background: "none", border: `1px solid ${border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16, marginLeft: 4 }}>{dark ? "☀️" : "🌙"}</button>
          <button onClick={() => alert("Redirecting to login...")}
            style={{ background: accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginLeft: 6 }}>
            Login →
          </button>
        </div>
      </nav>

      {/* HOME PAGE */}
      {page === "home" && (
        <div>
          {/* HERO */}
          <div style={{ textAlign: "center", padding: "80px 24px 60px", maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-block", background: accentLight, color: accent, borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 600, marginBottom: 20, border: `1px solid ${d ? "#4c3fff44" : "#6C63FF33"}` }}>
              🤖 AI-Powered Job Tracking
            </div>
            <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.5px" }}>
              Never Lose Track of<br />
              <span style={{ color: accent }}>Your Job Applications</span>
            </h1>
            <p style={{ fontSize: 16, color: muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
              JobTracker_App helps you organize every application, visualize your hiring pipeline, and get AI-powered insights to improve your job hunt — all in one place.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => alert("Redirecting to signup...")}
                style={{ background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
                Get Started Free →
              </button>
              <button onClick={() => setPage("features")}
                style={{ background: "none", color: txt, border: `1px solid ${border}`, borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                See Features
              </button>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{ display: "flex", justifyContent: "center", gap: 0, maxWidth: 700, margin: "0 auto 70px", background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
            {[["3", "Core Features"], ["100%", "Free to Use"], ["AI", "Powered Insights"], ["JWT", "Secure Auth"]].map(([val, label], i, arr) => (
              <div key={label} style={{ flex: 1, textAlign: "center", padding: "20px 16px", borderRight: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>{val}</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* FEATURE PREVIEW */}
          <div style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
            <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginBottom: 40 }}>Everything You Need to <span style={{ color: accent }}>Land Your Dream Job</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "22px 20px", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: txt, marginBottom: 8 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", padding: "60px 24px 80px", background: d ? "#0d0d18" : "#f0eeff", borderTop: `1px solid ${border}` }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14 }}>Ready to Take Control of Your <span style={{ color: accent }}>Job Hunt?</span></h2>
            <p style={{ color: muted, fontSize: 15, marginBottom: 28 }}>Start tracking your applications today — completely free.</p>
            <button onClick={() => alert("Redirecting to signup...")}
              style={{ background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
              Start For Free →
            </button>
          </div>
        </div>
      )}

      {/* FEATURES PAGE */}
      {page === "features" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>Features Built for <span style={{ color: accent }}>Job Seekers</span></h1>
            <p style={{ color: muted, fontSize: 15, maxWidth: 520, margin: "0 auto" }}>Every feature in JobTracker_App is designed to make your job hunt more organized, efficient, and data-driven.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ width: 48, height: 48, background: accentLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: txt, marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* TECH STACK */}
          <div style={{ marginTop: 60, background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "32px 28px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: txt }}>🛠 Tech Stack</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {[
                { layer: "Frontend", tech: "React.js + Vercel" },
                { layer: "Backend", tech: "Node.js + Express.js + Render" },
                { layer: "Database", tech: "MongoDB Atlas" },
                { layer: "Authentication", tech: "JWT + bcrypt" },
                { layer: "AI Integration", tech: "Google Gemini API" },
                { layer: "Deployment", tech: "Vercel + Render" },
              ].map(t => (
                <div key={t.layer} style={{ background: card2, borderRadius: 10, padding: "12px 16px", border: `1px solid ${border}` }}>
                  <div style={{ fontSize: 11, color: accent, fontWeight: 600, marginBottom: 4 }}>{t.layer}</div>
                  <div style={{ fontSize: 13, color: txt }}>{t.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      {page === "how-it-works" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>How <span style={{ color: accent }}>JobTracker</span> Works</h1>
            <p style={{ color: muted, fontSize: 15 }}>Get started in minutes. No setup required.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "24px 28px" }}>
                <div style={{ minWidth: 52, height: 52, background: accentLight, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: accent }}>{s.num}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: txt, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* AI INSIGHTS CALLOUT */}
          <div style={{ marginTop: 40, background: d ? "#1a1535" : "#f0eeff", border: `1px solid ${d ? "#4c3fff44" : "#6C63FF33"}`, borderRadius: 16, padding: "28px 28px" }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>🤖</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: txt, marginBottom: 8 }}>How AI Insights Work</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>
              Once you have applications logged, navigate to the <b style={{ color: accent }}>AI Insights</b> tab. JobTracker sends your anonymized application data (companies, roles, statuses, dates) to Google Gemini AI. Gemini analyzes patterns — like which roles get more responses, how your response rate trends over time — and returns a personalized <b style={{ color: txt }}>health score</b> and <b style={{ color: txt }}>actionable tips</b> to improve your job hunt strategy.
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 50 }}>
            <button onClick={() => alert("Redirecting to signup...")}
              style={{ background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
              Start Tracking Now →
            </button>
          </div>
        </div>
      )}

      {/* FEEDBACK PAGE */}
      {page === "feedback" && (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>Share Your <span style={{ color: accent }}>Feedback</span></h1>
            <p style={{ color: muted, fontSize: 15 }}>Your feedback helps improve JobTracker_App. All suggestions are welcome!</p>
          </div>

          {submitted ? (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: txt, marginBottom: 10 }}>Thank You!</div>
              <div style={{ fontSize: 14, color: muted, lineHeight: 1.6, marginBottom: 28 }}>Your feedback has been received. It genuinely helps make JobTracker better for everyone.</div>
              <button onClick={() => { setFeedback(FEEDBACK_INIT); setSubmitted(false); }}
                style={{ background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Submit Another
              </button>
            </div>
          ) : (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "36px 32px" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500 }}>Your Name</div>
                <input style={inp} placeholder="Mohammed Mubashir Ali" value={feedback.name} onChange={e => setFeedback({ ...feedback, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500 }}>Email Address</div>
                <input style={inp} placeholder="you@email.com" value={feedback.email} onChange={e => setFeedback({ ...feedback, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500 }}>Feedback Type</div>
                <select style={inp} value={feedback.type} onChange={e => setFeedback({ ...feedback, type: e.target.value })}>
                  <option value="feature">💡 Feature Request</option>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="improvement">🔧 Improvement Suggestion</option>
                  <option value="general">💬 General Feedback</option>
                </select>
              </div>
              <div style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500 }}>Your Message</div>
                <textarea style={{ ...inp, height: 120, resize: "vertical" }}
                  placeholder="Share your thoughts, ideas, or issues..."
                  value={feedback.message} onChange={e => setFeedback({ ...feedback, message: e.target.value })} />
              </div>
              <button onClick={handleFeedback}
                style={{ width: "100%", background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.3)" }}>
                Submit Feedback →
              </button>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>💼</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: accent }}>JobTracker_App</span>
        </div>
        <div style={{ fontSize: 12, color: muted }}>Built by Mohammed Mubashir Ali · Hyderabad, India</div>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="https://github.com/mubashir658/JobTracker_App" target="_blank" style={{ fontSize: 12, color: muted, textDecoration: "none" }}>GitHub</a>
          <a href="https://www.linkedin.com/in/mohammed-mubashir-ali-hyd658" target="_blank" style={{ fontSize: 12, color: muted, textDecoration: "none" }}>LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}