# Edge Cases

> Sprint 1 — 2026-05-16
> Owner: ux_designer + qa_tester

---

## Grid 10×10 trên mobile

Out of scope sprint 1 — web desktop only. Không cần test mobile viewport.

---

## User share URL — tab title và OG preview

| Platform | Hiển thị dự kiến |
|---------|-----------------|
| Tab browser | favicon.svg + "100 Ngày Tâm Lý Học" |
| Facebook / Messenger | og-image.png (1200×630) + og:title + og:description |
| Zalo | og-image.png + og:title |
| Twitter / X | summary_large_image — og-image.png + twitter:title |
| iMessage (iOS) | og:image + og:title |

**Lưu ý quan trọng:** GitHub Pages không có server-side rendering. OG tags nằm trong HTML tĩnh — meta crawlers vẫn đọc được vì chúng không cần JS. Không có vấn đề gì với static hosting.

---

## User offline

```
Scenario A — chưa vào app lần nào:
    → Không load được gì (DNS/HTML đều fail nếu không có cache)

Scenario B — đã vào trước, browser cache HTML + JS còn:
    → App shell load từ cache
    → window.storage restore completed set → grid hiện đúng tiến độ
    → User click ngày → fetch lesson JSON fail → error state với "Thử lại"
    → Nút "Thử lại" → user thử lại khi có mạng
```

Service Worker và offline caching nằm ngoài scope sprint 1.

---

## First load chậm (GitHub Pages CDN, mạng yếu Việt Nam)

```
Thứ tự render:
  t=0ms     User nhập URL
  t≈200ms   HTML tải về → browser parse → "#root" loading placeholder "Đang tải..." hiện
  t≈600ms   JS bundle download + parse (CDN esm.sh nếu no-build)
  t≈700ms   React mount, storage init
  t≈750ms   Grid 10×10 hiện đầy đủ
  t≈800ms   storage.get() resolve → progress bar cập nhật
```

Loading placeholder inline trong `#root` giải quyết khoảng trắng 0–200ms. Không cần skeleton loader cho grid vì grid render gần tức thì sau mount.

---

## IndexedDB không khả dụng (Safari Private Mode, WebView hạn chế)

`storage.js` tự detect và fallback về localStorage, không thông báo lỗi cho user. Component nhận đúng interface trong mọi trường hợp.

---

## OG image URL — path tương đối

`og:image` **bắt buộc phải là absolute URL**. Nếu dùng path tương đối (`/og-image.png`) thì Facebook/Zalo crawler không resolve được. Cần hardcode full URL khi build `index.html`:

```
https://[username].github.io/[repo-name]/og-image.png
```

Tech_lead cần confirm repo URL trước khi tạo `index.html`.
