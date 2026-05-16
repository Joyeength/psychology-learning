import { Check, RefreshCw, BookMarked, FlaskConical, Lightbulb, HelpCircle, Pencil, MousePointerClick } from "lucide-react";
import { TOPICS } from "./data.js";
import { Block } from "./Block.jsx";

export function DetailPanel({ selected, mod, dc, loading, completed, onMarkDone, onRetry }) {
  if (!selected) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0", color: "#888" }}>
        <MousePointerClick size={26} style={{ marginBottom: 8 }} />
        <p style={{ margin: 0, fontSize: 13 }}>Chọn một ngày để bắt đầu hành trình</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid rgba(128,128,128,0.2)", borderRadius: 12, padding: "1rem 1.25rem", borderTop: `3px solid ${mod.accent}` }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 11, color: mod.accent, fontFamily: "monospace", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
            <mod.Icon size={12} /> ngày {selected} · {mod.name}
          </p>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500 }}>{TOPICS[selected]}</h3>
        </div>
        {completed.has(selected) ? (
          <span style={{ background: "#1D9E7518", color: "#0F6E56", fontSize: 12, padding: "5px 12px", borderRadius: 8, fontWeight: 500, flexShrink: 0, border: "1px solid #1D9E7540", display: "flex", alignItems: "center", gap: 4 }}>
            <Check size={12} /> Hoàn thành
          </span>
        ) : dc && !dc.error ? (
          <button
            onClick={() => onMarkDone(selected)}
            style={{ background: mod.accent, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 500, flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}
          >
            <Check size={12} /> Đánh dấu xong
          </button>
        ) : null}
      </div>

      {loading ? (
        <p style={{ color: "#888", fontSize: 13, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> Đang tải...
        </p>
      ) : dc?.error ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>Không tải được nội dung: {dc.msg}</p>
          <button onClick={() => onRetry(selected)} style={{ alignSelf: "flex-start", background: "transparent", border: "1px solid rgba(128,128,128,0.3)", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <RefreshCw size={11} /> Thử lại
          </button>
        </div>
      ) : dc ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Block Icon={BookMarked}   label="Khái niệm chính"    text={dc.khaiNiem}    accent={mod.accent} />
          <Block Icon={Lightbulb}    label="Sự thật thú vị"     text={dc.suThatThuVi} accent={mod.accent} />
          <Block Icon={FlaskConical} label="Ví dụ / thí nghiệm" text={dc.viDu}        accent={mod.accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Block Icon={HelpCircle} label="Câu hỏi suy ngẫm" text={dc.cauHoi}  accent={mod.accent} highlight />
            <Block Icon={Pencil}     label="Nhiệm vụ hôm nay" text={dc.nhiemVu} accent={mod.accent} highlight />
          </div>
        </div>
      ) : (
        <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Chưa có nội dung cho ngày này.</p>
      )}
    </div>
  );
}
