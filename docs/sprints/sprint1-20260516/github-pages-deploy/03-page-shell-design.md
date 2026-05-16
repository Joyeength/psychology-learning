# Page Shell Design — index.html

> Sprint 1 — 2026-05-16
> Owner: ux_designer

---

## Cấu trúc head

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & identity -->
  <title>100 Ngày Tâm Lý Học</title>
  <meta name="description" content="Khám phá tâm lý học qua 100 bài học ngắn hàng ngày — từ Freud đến flow state, từ trí nhớ đến hạnh phúc." />

  <!-- Open Graph (Facebook, Zalo, Messenger) -->
  <meta property="og:type"         content="website" />
  <meta property="og:title"        content="100 Ngày Tâm Lý Học" />
  <meta property="og:description"  content="Khám phá tâm lý học qua 100 bài học ngắn hàng ngày — từ Freud đến flow state, từ trí nhớ đến hạnh phúc." />
  <meta property="og:image"        content="https://joyeength.github.io/psychology-learning/og-image.png" />
  <meta property="og:image:width"  content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale"       content="vi_VN" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="100 Ngày Tâm Lý Học" />
  <meta name="twitter:description" content="Khám phá tâm lý học qua 100 bài học ngắn hàng ngày." />
  <meta name="twitter:image"       content="https://joyeength.github.io/psychology-learning/og-image.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/x-icon"  href="/favicon.ico" />

  <!-- Preconnect CDN (nếu dùng no-build path) -->
  <link rel="preconnect" href="https://esm.sh" />
</head>
<body>
  <div id="root">
    <!-- Inline loading placeholder — hiện ngay trước khi JS load xong -->
    <div style="padding:2rem;text-align:center;font-family:system-ui,sans-serif;color:#888;font-size:13px;">
      Đang tải...
    </div>
  </div>
  <script type="module" src="./main.js"></script>
</body>
</html>
```

**Lưu ý về `[BASE_URL]`:** GitHub Pages dùng `https://[username].github.io/[repo-name]`. og:image phải là absolute URL đầy đủ — không dùng path tương đối cho OG tags vì crawler không resolve path tương đối.

---

## OG image — og-image.png (1200×630 px)

Tạo bằng HTML/CSS được screenshot hoặc tool design đơn giản. Spec:

```
Kích thước: 1200 × 630 px
Nền: #111111 (khớp với dark theme của app)

Vùng trên (chiếm 2/3 chiều cao):
  - Dòng 1: "100 Ngày" — chữ trắng (#FFFFFF), ~72px, font-weight 500
  - Dòng 2: "Tâm Lý Học" — màu #534AB7 (accent Nền tảng), ~56px, font-weight 600
  - Khoảng cách giữa hai dòng: 16px

Vùng dưới (chiếm 1/3 chiều cao):
  - 10 chấm tròn (diameter 12px), xếp hàng ngang, gap 8px
    Màu từ trái qua phải: #534AB7 · #BA7517 · #0F6E56 · #D4537E · #185FA5
                           #993C1D · #7F77DD · #639922 · #1D9E75 · #993556
  - Bên dưới chấm: "10 chủ đề · 100 bài học · Tiếng Việt"
    font 16px, màu #888888

Padding tổng thể: 80px trái/phải, 60px trên/dưới
Không thêm viền, không thêm gradient nền
```

---

## Favicon — favicon.svg

Dùng Brain icon path đã có sẵn trong `preview.html`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="#534AB7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.13A3 3 0 0 1 4.25 12a3 3 0 0 1 .79-2 2.5 2.5 0 0 1 .65-3.57A2.5 2.5 0 0 1 9.5 2Z"/>
  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.13A3 3 0 0 0 19.75 12a3 3 0 0 0-.79-2 2.5 2.5 0 0 0-.65-3.57A2.5 2.5 0 0 0 14.5 2Z"/>
</svg>
```

Màu stroke `#534AB7` — cùng accent với progress bar, đủ contrast trên cả nền trắng và nền tối của tab browser. Không cần `favicon.ico` riêng nếu target browser hiện đại, nhưng nên có để backup cho browser cũ.
