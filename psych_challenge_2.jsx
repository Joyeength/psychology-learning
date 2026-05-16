import { useState, useEffect, useRef } from "react";
import { BookOpen, Eye, Brain, Heart, Zap, Users, Star, Sprout, Leaf, Rocket, Check } from "lucide-react";
import { MODULES as MODULE_DEFS, TOPICS, getMod as getModBase } from "./data.js";
import { DetailPanel } from "./DetailPanel.jsx";

const MODULE_EXTRAS = {
  1:  { Icon: BookOpen, accent: "#534AB7" },
  2:  { Icon: Eye,      accent: "#BA7517" },
  3:  { Icon: Brain,    accent: "#0F6E56" },
  4:  { Icon: Heart,    accent: "#D4537E" },
  5:  { Icon: Zap,      accent: "#185FA5" },
  6:  { Icon: Users,    accent: "#993C1D" },
  7:  { Icon: Star,     accent: "#7F77DD" },
  8:  { Icon: Sprout,   accent: "#639922" },
  9:  { Icon: Leaf,     accent: "#1D9E75" },
  10: { Icon: Rocket,   accent: "#993556" },
};
const MODULES = MODULE_DEFS.map(m => ({ ...m, ...MODULE_EXTRAS[m.id] }));
const DAYS    = Array.from({ length: 100 }, (_, i) => i + 1);

function getMod(day) { return MODULES[getModBase(day).id - 1]; }

export default function PsychChallenge() {
  const [completed, setCompleted]   = useState(new Set());
  const [selected, setSelected]     = useState(null);
  const [cache, setCache]           = useState({});
  const [loadingDays, setLoadingDays] = useState(new Set());
  const fetchingRef = useRef(new Set());

  useEffect(() => {
    window.storage.get("psych100_done")
      .then(r => { if (r) setCompleted(new Set(JSON.parse(r.value))); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const day = selected;
    if (!day || cache[day] || fetchingRef.current.has(day)) return;
    fetchingRef.current.add(day);
    setLoadingDays(s => new Set([...s, day]));
    fetch(`./lessons/${day}.json`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(data => setCache(c => ({ ...c, [day]: data })))
      .catch(e  => setCache(c => ({ ...c, [day]: { error: true, msg: e.message } })))
      .finally(() => {
        setLoadingDays(s => { const n = new Set(s); n.delete(day); return n; });
        fetchingRef.current.delete(day);
      });
  }, [selected]);

  function markDone(day) {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(day);
      window.storage.set("psych100_done", JSON.stringify([...next])).catch(() => {});
      return next;
    });
  }

  function retry(day) {
    setCache(c => { const n = { ...c }; delete n[day]; return n; });
  }

  const mod     = selected ? getMod(selected) : null;
  const dc      = selected ? cache[selected] : null;
  const loading = selected ? loadingDays.has(selected) : false;
  const count   = completed.size;

  return (
    <div style={{ padding: "1.5rem 0.25rem", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 680, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#888", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px" }}>Challenge · 100 ngày</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 500 }}>Tâm lý học</span>
          <span style={{ fontFamily: "monospace", fontSize: 13, color: "#888" }}>{count}/100 ngày</span>
        </div>
        <div style={{ height: 4, background: "rgba(128,128,128,0.15)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${count}%`, background: "#534AB7", borderRadius: 2, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Module legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginBottom: "1rem" }}>
        {MODULES.map(m => (
          <span key={m.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#888" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: m.accent, flexShrink: 0, display: "inline-block" }} />
            {m.name}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 5, marginBottom: "1.5rem" }}>
        {DAYS.map(day => {
          const m = getMod(day), done = completed.has(day), sel = selected === day;
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              title={TOPICS[day]}
              style={{
                aspectRatio: "1", border: sel ? `2px solid ${m.accent}` : "1px solid rgba(128,128,128,0.2)",
                borderRadius: 6, background: done ? m.accent + "22" : sel ? m.accent + "14" : "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", position: "relative", padding: 0,
                transition: "all 0.12s", outline: "none",
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: done || sel ? 600 : 400, color: done || sel ? m.accent : "#888", lineHeight: 1 }}>{day}</span>
              {done && <Check size={7} color={m.accent} style={{ position: "absolute", bottom: 2, right: 2 }} />}
            </button>
          );
        })}
      </div>

      <DetailPanel
        selected={selected}
        mod={mod}
        dc={dc}
        loading={loading}
        completed={completed}
        onMarkDone={markDone}
        onRetry={retry}
      />
    </div>
  );
}
