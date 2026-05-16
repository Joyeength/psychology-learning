# Accessibility

> Sprint 1 — 2026-05-16
> Owner: qa_tester

---

## Có sẵn trong component (giữ nguyên)

- `<button>` native trên mỗi ô grid — keyboard focusable
- `title={TOPICS[day]}` trên mỗi button — tooltip + screen reader hint
- `lang="vi"` trên `<html>` — đảm bảo screen reader dùng đúng ngôn ngữ

## Cần bổ sung trong index.html

- `<meta charset="UTF-8">` — tiếng Việt render đúng
- `<html lang="vi">` — không thiếu

---

## Kiểm tra contrast (qa_tester)

| Thành phần | Foreground | Background | Cần đạt |
|-----------|-----------|-----------|--------|
| Số trong nút grid (default) | #888888 | #111111 | ≥ 3:1 (UI component) |
| Số trong nút grid (selected/done) | accent color | #111111 | ≥ 3:1 |
| Label Block (uppercase, 10px) | #888888 | rgba block | ≥ 4.5:1 (small text) |
| Text nội dung Block | #e5e5e5 | rgba block | ≥ 4.5:1 |
| Nút "Đánh dấu xong" | #FFFFFF | accent | ≥ 4.5:1 |

Accent nhạt nhất: `#BA7517` (Nhận thức) — cần kiểm tra kỹ trên nền tối.
