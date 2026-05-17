/* @jsxRuntime classic */

function SvgIcon({ elems, size = 16, color, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={style}>
      {elems.map((e, i) => {
        if (e[0] === 'path')     return <path     key={i} d={e[1]} />;
        if (e[0] === 'circle')   return <circle   key={i} cx={e[1]} cy={e[2]} r={e[3]} />;
        if (e[0] === 'polygon')  return <polygon  key={i} points={e[1]} />;
        if (e[0] === 'polyline') return <polyline key={i} points={e[1]} />;
        return null;
      })}
    </svg>
  );
}
const p = (...elems) => ({ size, color, style }) => <SvgIcon elems={elems} size={size} color={color} style={style} />;

// All icons — module icons also exposed here for use in psych_challenge_2.jsx
const BookOpen          = p(['path','M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'],['path','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z']);
const Eye               = p(['path','M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'],['circle',12,12,3]);
const Brain             = p(['path','M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.13A3 3 0 0 1 4.25 12a3 3 0 0 1 .79-2 2.5 2.5 0 0 1 .65-3.57A2.5 2.5 0 0 1 9.5 2Z'],['path','M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.13A3 3 0 0 0 19.75 12a3 3 0 0 0-.79-2 2.5 2.5 0 0 0-.65-3.57A2.5 2.5 0 0 0 14.5 2Z']);
const Heart             = p(['path','M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z']);
const Zap               = p(['polygon','13 2 3 14 12 14 11 22 21 10 12 10 13 2']);
const Users             = p(['path','M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'],['circle',9,7,4],['path','M22 21v-2a4 4 0 0 0-3-3.87'],['path','M16 3.13a4 4 0 0 1 0 7.75']);
const Star              = p(['polygon','12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2']);
const Sprout            = p(['path','M7 20h10'],['path','M10 20c5.5-2.5.8-6.4 3-10'],['path','M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z'],['path','M14.1 6a7 7 0 0 1 3.4 11.3c-2.2-.1-4-.9-5.2-2.3-.3-.4-.6-.8-.7-1.3-.1-.5 0-1 .2-1.5.3-.7.8-1.2 1.3-1.7']);
const Leaf              = p(['path','M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z'],['path','M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12']);
const Rocket            = p(['path','M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'],['path','m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'],['path','M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'],['path','M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5']);
const Check             = p(['path','M20 6 9 17l-5-5']);
const RefreshCw         = p(['path','M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8'],['path','M21 3v5h-5'],['path','M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16'],['path','M8 16H3v5']);
const BookMarked        = p(['path','M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'],['polyline','10 2 10 10 13 7 16 10 16 2']);
const FlaskConical      = p(['path','M14 2v6l3 9H7l3-9V2'],['path','M6 2h12'],['path','M9 15h6']);
const Lightbulb         = p(['path','M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'],['path','M9 18h6'],['path','M10 22h4']);
const HelpCircle        = p(['circle',12,12,10],['path','M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'],['path','M12 17h.01']);
const Pencil            = p(['path','M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'],['path','m15 5 4 4']);
const MousePointerClick = p(['path','m9 9 5 12 1.774-5.226L21 14 9 9z'],['path','m16.071 16.071 4.243 4.243'],['path','m7.188 2.239.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122']);
const SettingsIcon      = p(['path','M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z'],['circle',12,12,3]);

// Expose on window for psych_challenge_2.jsx and future feature files
Object.assign(window, {
  SvgIcon, p,
  BookOpen, Eye, Brain, Heart, Zap, Users, Star, Sprout, Leaf, Rocket,
  Check, RefreshCw, BookMarked, FlaskConical, Lightbulb, HelpCircle, Pencil, MousePointerClick, SettingsIcon,
});

function Block({ Icon: Ic, label, text, accent, highlight }) {
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

function DetailPanel({ selected, mod, dc, loading, completed, onMarkDone, onRetry, journalEntry, syncStatus, onNoteChange }) {
  const JournalPanel = window.JournalPanel;
  const TOPICS = window.TOPICS;

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
      ) : dc && dc.error ? (
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

      {JournalPanel && (
        <JournalPanel
          day={selected}
          entry={journalEntry}
          syncStatus={syncStatus}
          onNoteChange={onNoteChange}
        />
      )}
    </div>
  );
}

window.Block = Block;
window.DetailPanel = DetailPanel;
