export function Block({ Icon: Ic, label, text, accent, highlight }) {
  return (
    <div style={{
      padding: "11px 14px",
      background: highlight ? accent + "14" : "rgba(128,128,128,0.07)",
      borderLeft: `3px solid ${accent}`,
      borderRadius: 4,
    }}>
      <p style={{ margin: "0 0 5px", fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: 4 }}>
        {Ic && <Ic size={11} />}{label}
      </p>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "inherit" }}>{text}</p>
    </div>
  );
}
