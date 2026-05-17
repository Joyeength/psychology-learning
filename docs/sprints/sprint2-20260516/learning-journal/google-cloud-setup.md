# Google Cloud Setup — F3 Learning Journal

> **Owner:** devops / user
> **Prerequisite for:** BUILD Phase 2 (GDriveSync.js)
> **Status:** pending

Cần hoàn thành trước khi bắt đầu code `GDriveSync.js`. OAuth Client ID và API Key sẽ được embed vào file đó.

---

## Phần 1 — Tạo Google Cloud Project

1. Vào https://console.cloud.google.com — đăng nhập bằng Google account sẽ quản lý app
2. Click dropdown project (góc trên trái, cạnh logo) → **"New Project"**
3. **Project name:** `psychology-learning` → **"Create"**
4. Chọn project vừa tạo từ dropdown

---

## Phần 2 — Enable APIs

5. Menu trái → **"APIs & Services"** → **"Library"**
6. Search `Google Drive API` → Enable
7. Search `Google Picker API` → Enable

---

## Phần 3 — OAuth Consent Screen (bắt buộc làm trước)

8. Menu trái → **"APIs & Services"** → **"OAuth consent screen"**
9. **User Type:** chọn **"External"** → **"Create"**
10. Điền:
    - **App name:** `Psychology Learning Journal`
    - **User support email:** email của bạn
    - **Developer contact:** email của bạn
    - → **"Save and Continue"**
11. **Scopes** → **"Add or Remove Scopes"** → thêm 2 scopes:
    - `https://www.googleapis.com/auth/drive.file`
    - `https://www.googleapis.com/auth/drive.readonly`
    - → **"Update"** → **"Save and Continue"**
12. **Test users** → **"Add Users"** → thêm email của bạn → **"Save and Continue"**

> App ở trạng thái **"Testing"** — chỉ email trong test users mới dùng được. Không cần publish nếu chỉ dùng cho bản thân.

---

## Phần 4 — Tạo OAuth Client ID

13. Menu trái → **"Credentials"** → **"+ Create Credentials"** → **"OAuth client ID"**
14. **Application type:** `Web application`
15. **Name:** `Psychology Learning SPA`
16. **Authorized JavaScript origins** — thêm:
    - `https://joyeength.github.io`
    - `http://localhost:3000` (cho local dev)
17. **Authorized redirect URIs:** để **trống** (GIS implicit flow không cần)
18. **"Create"** → **copy Client ID ngay** (dạng `xxxxxxx.apps.googleusercontent.com`)

> **Gotcha:** Không có trailing slash — `https://joyeength.github.io` đúng, `https://joyeength.github.io/` sai.

---

## Phần 5 — Tạo Browser API Key

19. Vẫn ở **"Credentials"** → **"+ Create Credentials"** → **"API key"**
20. **Copy key ngay** → click **"Edit API key"** để restrict:
    - **Name:** `Psychology Learning Picker Key`
    - **Application restrictions:** `Websites` → thêm `https://joyeength.github.io/*`
    - **API restrictions:** `Restrict key` → chọn `Google Picker API`
    - **"Save"**

---

## 2 giá trị cần lưu lại

| Giá trị | Format | Dùng cho |
|---|---|---|
| **OAuth Client ID** | `576741657901-hpo3f6e4ppdemn63rnom529a87tlg9o8.apps.googleusercontent.com` | `GDriveSync.js` — `initTokenClient` |
| **Browser API Key** | `AIzaSyBOExGdLopNc2PBSgMLJm_j5RvTGhsJ4QA` | `GDriveSync.js` — Picker API |

Client ID được embed là constant trong `GDriveSync.js` (public JS — an toàn).
**Client Secret KHÔNG dùng** với GIS implicit flow — không lưu vào bất kỳ file nào.

---

## Lỗi thường gặp khi test

| Lỗi | Nguyên nhân | Fix |
|---|---|---|
| `origin_mismatch` | Authorized origin sai hoặc có trailing slash | Xóa trailing slash |
| `access_blocked` | Email chưa được add vào Test Users | Thêm email vào Test Users (bước 12) |
| `invalid_api_key` | API key chưa enable Google Picker API | Edit key → API restrictions → thêm Picker API |

Sau khi tạo credentials, **đợi 5 phút** để Google propagate trước khi test.

---

## Checklist hoàn thành

- [ ] Google Cloud project tạo xong
- [ ] Google Drive API enabled
- [ ] Google Picker API enabled
- [ ] OAuth consent screen configured (External, Testing mode)
- [ ] 2 scopes added: `drive.file` + `drive.readonly`
- [ ] Email added vào Test Users
- [x] OAuth Client ID tạo xong — `576741657901-hpo3f6e4ppdemn63rnom529a87tlg9o8.apps.googleusercontent.com`
- [x] Browser API Key tạo xong — `AIzaSyBOExGdLopNc2PBSgMLJm_j5RvTGhsJ4QA`
- [ ] `https://joyeength.github.io` trong Authorized JavaScript origins
