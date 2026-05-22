export const getThemeColors = (dark) => {
  const d = dark;
  return {
    bg: d ? "#0f0f13" : "#f4f6fb",
    card: d ? "#1a1a24" : "#ffffff",
    border: d ? "#2a2a3a" : "#e5e8ef",
    txt: d ? "#e8eaf0" : "#1a1a2e",
    muted: d ? "#888aaa" : "#6b7280",
    inputBg: d ? "#22223a" : "#f8f9fc",
    accent: "#534AB7",
  };
};

export const getInputStyle = (theme) => ({
  background: theme.inputBg,
  border: `1px solid ${theme.border}`,
  borderRadius: 8,
  padding: "9px 12px",
  color: theme.txt,
  fontSize: 14,
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
});
