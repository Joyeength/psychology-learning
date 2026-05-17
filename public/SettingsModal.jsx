/* @jsxRuntime classic */
const { useState, useEffect } = React;

function SettingsModal({ onClose }) {
  const [state, setState] = useState('loading');
  // state: 'loading' | 'disconnected' | 'connecting' | 'connected-no-folder' | 'picking' | 'connected' | 'error'
  const [email, setEmail]         = useState(null);
  const [folder, setFolder]       = useState(null);
  const [errorMsg, setErrorMsg]   = useState(null);
  const [disconnecting, setDisconnecting] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  useEffect(function () {
    var info = window.GDriveSync.getConnectedInfo();
    if (info.connected && info.folderId) {
      setEmail(info.email);
      setFolder({ id: info.folderId, name: info.folderName });
      setState('connected');
    } else {
      setState('disconnected');
    }
  }, []);

  function handleConnect() {
    setState('connecting');
    setErrorMsg(null);
    window.GDriveSync.connect()
      .then(function (result) {
        setEmail(result.email);
        if (result.folderId) {
          setFolder({ id: result.folderId, name: result.folderName });
          setState('connected');
        } else {
          setState('connected-no-folder');
        }
      })
      .catch(function (e) {
        if (e.message === 'access_denied') {
          setErrorMsg('Cần cấp quyền để sync. Bạn có thể dùng app không sync.');
        } else {
          setErrorMsg('Không kết nối được Google. Thử lại sau.');
        }
        setState('disconnected');
      });
  }

  function handlePickFolder() {
    setState('picking');
    window.GDriveSync.openFolderPicker(
      function (result) {
        setFolder({ id: result.folderId, name: result.folderName });
        setState('connected');
      },
      function (err) {
        setState('connected-no-folder');
        setErrorMsg('Không mở được folder picker. Cho phép popup từ trang này.');
      }
    );
  }

  function handleDisconnect() {
    setDisconnecting(true);
    window.GDriveSync.disconnect().then(function () {
      setEmail(null);
      setFolder(null);
      setDisconnecting(false);
      setConfirmDisconnect(false);
      setState('disconnected');
    });
  }

  var S = {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    },
    modal: {
      background: '#fff', borderRadius: 12, padding: '1.5rem',
      maxWidth: 420, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      color: '#1a1a1a',
    },
    title: { margin: '0 0 1.25rem', fontSize: 16, fontWeight: 600 },
    section: { marginBottom: '1.25rem' },
    label: { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, display: 'block' },
    row: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
    pill: {
      background: '#f0fdf4', color: '#166534', fontSize: 12,
      padding: '4px 10px', borderRadius: 20, border: '1px solid #bbf7d0',
    },
    btnPrimary: {
      background: '#534AB7', color: '#fff', border: 'none',
      borderRadius: 8, padding: '8px 16px', fontSize: 13,
      cursor: 'pointer', fontWeight: 500,
    },
    btnSecondary: {
      background: 'transparent', color: '#534AB7', border: '1px solid #534AB7',
      borderRadius: 8, padding: '8px 16px', fontSize: 13,
      cursor: 'pointer', fontWeight: 500,
    },
    btnDanger: {
      background: 'transparent', color: '#c0392b', border: '1px solid #e5a3a3',
      borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer',
    },
    btnClose: {
      background: 'transparent', border: 'none', fontSize: 18,
      cursor: 'pointer', color: '#888', padding: 4,
    },
    error: { color: '#c0392b', fontSize: 12, marginTop: 6 },
    hint: { color: '#888', fontSize: 12, marginTop: 4 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' },
  };

  return (
    <div style={S.overlay} onClick={function (e) { if (e.target === e.currentTarget) onClose(); }}>
      <div style={S.modal}>
        <div style={S.header}>
          <h2 style={S.title}>Cài đặt</h2>
          <button style={S.btnClose} onClick={onClose}>×</button>
        </div>

        {/* Google Drive section */}
        <div style={S.section}>
          <span style={S.label}>Google Drive Sync</span>

          {state === 'loading' && (
            <p style={{ color: '#888', fontSize: 13 }}>Đang tải...</p>
          )}

          {state === 'disconnected' && (
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#555' }}>
                Sync note sang Google Drive → tự động có trong Obsidian vault.
              </p>
              <button style={S.btnPrimary} onClick={handleConnect}>Kết nối Google Drive</button>
              {errorMsg && <p style={S.error}>{errorMsg}</p>}
            </div>
          )}

          {state === 'connecting' && (
            <p style={{ color: '#888', fontSize: 13 }}>Đang mở Google OAuth...</p>
          )}

          {(state === 'connected-no-folder' || state === 'picking') && (
            <div>
              <div style={S.row}>
                <span style={S.pill}>✓ {email}</span>
              </div>
              <p style={{ margin: '10px 0 8px', fontSize: 13, color: '#555' }}>
                Chọn folder Obsidian vault của bạn:
              </p>
              <button
                style={S.btnPrimary}
                onClick={handlePickFolder}
                disabled={state === 'picking'}
              >
                {state === 'picking' ? 'Đang mở picker...' : 'Chọn folder Drive'}
              </button>
              <p style={S.hint}>Thường là folder vault bạn đã sync với Google Drive Desktop.</p>
              {errorMsg && <p style={S.error}>{errorMsg}</p>}
            </div>
          )}

          {state === 'connected' && !confirmDisconnect && (
            <div>
              <div style={Object.assign({}, S.row, { marginBottom: 8 })}>
                <span style={S.pill}>✓ {email}</span>
              </div>
              <p style={{ margin: '0 0 4px', fontSize: 13, color: '#555' }}>
                Sync vào: <strong>{folder && folder.name}</strong>/Psychology100/
              </p>
              <p style={S.hint}>
                Note sẽ tự sync sau 2s. Obsidian đọc file qua Google Drive Desktop.
              </p>
              <div style={Object.assign({}, S.row, { marginTop: 12 })}>
                <button style={S.btnSecondary} onClick={handlePickFolder}>Đổi folder</button>
                <button style={S.btnDanger} onClick={function () { setConfirmDisconnect(true); }}>Ngắt kết nối</button>
              </div>
            </div>
          )}

          {confirmDisconnect && (
            <div style={{ background: '#fff5f5', borderRadius: 8, padding: '12px', border: '1px solid #fca5a5' }}>
              <p style={{ margin: '0 0 10px', fontSize: 13 }}>
                Ngắt kết nối sẽ dừng sync. File đã upload vẫn còn trong Drive. Tiếp tục?
              </p>
              <div style={S.row}>
                <button style={S.btnDanger} onClick={handleDisconnect} disabled={disconnecting}>
                  {disconnecting ? 'Đang xử lý...' : 'Xác nhận ngắt'}
                </button>
                <button style={S.btnSecondary} onClick={function () { setConfirmDisconnect(false); }}>Hủy</button>
              </div>
            </div>
          )}
        </div>

        {/* About section */}
        <div style={{ borderTop: '1px solid rgba(128,128,128,0.15)', paddingTop: '1rem' }}>
          <span style={S.label}>Về app</span>
          <p style={{ margin: 0, fontSize: 12, color: '#888', lineHeight: 1.6 }}>
            100 Ngày Tâm Lý Học — Sprint 2
          </p>
        </div>
      </div>
    </div>
  );
}

window.SettingsModal = SettingsModal;
