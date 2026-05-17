/* @jsxRuntime classic */
const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

// Icons and components set by DetailPanel.jsx (loaded first)
const { BookOpen, Eye, Brain, Heart, Zap, Users, Star, Sprout, Leaf, Rocket, Check, SettingsIcon, DetailPanel } = window;

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

const MODULES = window.MODULES_DEF.map(function(m) { return Object.assign({}, m, MODULE_EXTRAS[m.id]); });
const DAYS    = Array.from({ length: 100 }, function(_, i) { return i + 1; });
function getMod(day) { return MODULES[window.getModBase(day).id - 1]; }

function PsychChallenge() {
  const [completed, setCompleted]       = useState(new Set());
  const [selected, setSelected]         = useState(null);
  const [cache, setCache]               = useState({});
  const [loadingDays, setLoadingDays]   = useState(new Set());
  const [journalData, setJournalData]   = useState({});   // { [day]: { note, checklist, lastSyncedAt } }
  const [syncStatusMap, setSyncStatusMap] = useState({}); // { [day]: 'idle'|'syncing'|'error'|'disconnected' }
  const [settingsOpen, setSettingsOpen] = useState(false);
  const fetchingRef = useRef(new Set());

  // Load persisted completed days
  useEffect(function() {
    window.storage.get("psych100_done")
      .then(function(r) { if (r && r.value) setCompleted(new Set(JSON.parse(r.value))); })
      .catch(function() {});
  }, []);

  // Load persisted journal data
  useEffect(function() {
    window.storage.get("psych100_journal")
      .then(function(r) {
        if (r && r.value) {
          try { setJournalData(JSON.parse(r.value)); } catch (_) {}
        }
      })
      .catch(function() {});
  }, []);

  // Subscribe to GDriveSync status updates
  useEffect(function() {
    if (!window.GDriveSync) return;
    var unsub = window.GDriveSync.setStatusListener(function(day, status) {
      setSyncStatusMap(function(prev) { return Object.assign({}, prev, { [day]: status }); });
    });
    return unsub;
  }, []);

  // Listen for openSettings event from JournalPanel disconnected badge
  useEffect(function() {
    function handler() { setSettingsOpen(true); }
    window.addEventListener('openSettings', handler);
    return function() { window.removeEventListener('openSettings', handler); };
  }, []);

  // Lazy-load lesson JSON on day selection
  useEffect(function() {
    const day = selected;
    if (!day || cache[day] || fetchingRef.current.has(day)) return;
    fetchingRef.current.add(day);
    setLoadingDays(function(s) { return new Set([...s, day]); });
    fetch(`./lessons/${day}.json`)
      .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)); })
      .then(function(data) { setCache(function(c) { return Object.assign({}, c, { [day]: data }); }); })
      .catch(function(e)   { setCache(function(c) { return Object.assign({}, c, { [day]: { error: true, msg: e.message } }); }); })
      .finally(function() {
        setLoadingDays(function(s) { const n = new Set(s); n.delete(day); return n; });
        fetchingRef.current.delete(day);
      });
  }, [selected]);

  function markDone(day) {
    setCompleted(function(prev) {
      const next = new Set(prev);
      next.add(day);
      window.storage.set("psych100_done", JSON.stringify([...next])).catch(function() {});
      return next;
    });
  }

  function retry(day) {
    setCache(function(c) { const n = Object.assign({}, c); delete n[day]; return n; });
  }

  function handleNoteChange(day, note, checklist) {
    setJournalData(function(prev) {
      const updated = Object.assign({}, prev, {
        [day]: Object.assign({}, prev[day] || {}, { note: note, checklist: checklist }),
      });
      window.storage.set("psych100_journal", JSON.stringify(updated)).catch(function() {});
      return updated;
    });
  }

  const mod     = selected ? getMod(selected) : null;
  const dc      = selected ? cache[selected]   : null;
  const loading = selected ? loadingDays.has(selected) : false;
  const count   = completed.size;

  const SettingsModal = window.SettingsModal;

  return (
    <div style={{ padding: "1.5rem 0.25rem", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 680, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#888", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px" }}>Challenge · 100 ngày</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 500 }}>Tâm lý học</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#888" }}>{count}/100 ngày</span>
            {SettingsIcon && (
              <button
                onClick={function() { setSettingsOpen(true); }}
                title="Cài đặt"
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#aaa", padding: 2, display: "flex", alignItems: "center" }}
              >
                <SettingsIcon size={16} />
              </button>
            )}
          </div>
        </div>
        <div style={{ height: 4, background: "rgba(128,128,128,0.15)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${count}%`, background: "#534AB7", borderRadius: 2, transition: "width 0.4s" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginBottom: "1rem" }}>
        {MODULES.map(function(m) {
          return (
            <span key={m.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#888" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: m.accent, flexShrink: 0, display: "inline-block" }} />
              {m.name}
            </span>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 5, marginBottom: "1.5rem" }}>
        {DAYS.map(function(day) {
          const m = getMod(day), done = completed.has(day), sel = selected === day;
          return (
            <button
              key={day}
              onClick={function() { setSelected(day); }}
              title={window.TOPICS[day]}
              style={{
                aspectRatio: "1",
                border: sel ? `2px solid ${m.accent}` : "1px solid rgba(128,128,128,0.2)",
                borderRadius: 6,
                background: done ? m.accent + "22" : sel ? m.accent + "14" : "transparent",
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
        journalEntry={selected ? (journalData[selected] || null) : null}
        syncStatus={selected ? (syncStatusMap[selected] || (window.GDriveSync ? window.GDriveSync.getStatus(selected) : null)) : null}
        onNoteChange={handleNoteChange}
      />

      {settingsOpen && SettingsModal && (
        <SettingsModal onClose={function() { setSettingsOpen(false); }} />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<PsychChallenge />);
