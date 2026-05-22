export default function AIInsights({ insights, insightsLoading, insightsError, onRefresh, theme }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: theme.txt }}>🤖 AI Insights</div>
          <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>Powered by Gemini AI</div>
        </div>
        <button onClick={onRefresh}
          style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", color: theme.txt }}>
          🔄 Refresh
        </button>
      </div>

      {insightsLoading && (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
          <div style={{ fontSize: 14, color: theme.muted }}>Gemini is analyzing your job hunt...</div>
        </div>
      )}

      {insightsError && (
        <div style={{ background: "#FCEBEB", color: "#A32D2D", borderRadius: 8, padding: "14px 16px", fontSize: 13 }}>{insightsError}</div>
      )}

      {insights && !insightsLoading && (
        <>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "24px 28px", marginBottom: 20, display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ textAlign: "center", minWidth: 90 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: insights.healthScore >= 75 ? "#639922" : insights.healthScore >= 50 ? "#EF9F27" : "#E24B4A" }}>{insights.healthScore}</div>
              <div style={{ fontSize: 12, color: theme.muted }}>Health Score</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: insights.healthScore >= 75 ? "#639922" : insights.healthScore >= 50 ? "#EF9F27" : "#E24B4A", marginTop: 2 }}>{insights.healthLabel}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 8, background: theme.border, borderRadius: 8, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ height: 8, width: `${insights.healthScore}%`, background: insights.healthScore >= 75 ? "#639922" : insights.healthScore >= 50 ? "#EF9F27" : "#E24B4A", borderRadius: 8 }} />
              </div>
              <div style={{ fontSize: 14, color: theme.txt, lineHeight: 1.6 }}>{insights.summary}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
            {insights.insights?.map((ins, i) => {
              const tc = { positive: { bg: "#EAF3DE", text: "#3B6D11", border: "#639922", icon: "✅" }, warning: { bg: "#FAEEDA", text: "#854F0B", border: "#EF9F27", icon: "⚠️" }, tip: { bg: "#EEEDFE", text: "#3C3489", border: "#7F77DD", icon: "💡" } }[ins.type] || { bg: "#EEEDFE", text: "#3C3489", border: "#7F77DD", icon: "💡" };
              return (
                <div key={i} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{tc.icon} {ins.type}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt, marginBottom: 6 }}>{ins.title}</div>
                  <div style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6 }}>{ins.description}</div>
                </div>
              );
            })}
          </div>

          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt, marginBottom: 14 }}>💡 Actionable Tips</div>
            {insights.tips?.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ minWidth: 24, height: 24, background: "#EEEDFE", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#534AB7" }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: theme.txt, lineHeight: 1.6, paddingTop: 2 }}>{tip}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
