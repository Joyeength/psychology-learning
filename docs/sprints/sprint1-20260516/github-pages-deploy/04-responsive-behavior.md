# Responsive Behavior

> Sprint 1 — 2026-05-16
> Owner: ux_designer
> **Scope: Future reference only — Sprint 1 là web desktop only. Mobile out of scope.**

---

## Grid 10×10 trên các breakpoint

**Phân tích kích thước ô:**

```
Màn 320px: (320 - 2×8px padding body - gap 5px×9) / 10 ≈ 25px × 25px mỗi ô
Màn 375px: (375 - 2×8px - 45px gap) / 10 ≈ 31px × 31px
Màn 428px: (428 - 2×8px - 45px) / 10 ≈ 37px × 37px
Desktop:   maxWidth 680px, căn giữa — grid ~62px × 62px mỗi ô
```

Grid dùng `repeat(10, 1fr)` — co giãn tự nhiên theo container. Không có overflow ngang trên bất kỳ breakpoint nào.

**Touch target:** Recommended là 44px. Trên 375px ô chỉ 31px — nhỏ hơn recommended nhưng vẫn tap được vì các ô sát nhau tạo ra vùng tap liên tục. Chấp nhận cho sprint 1.

**Fix nhỏ nếu cần (không bắt buộc sprint 1):**

```css
/* Giảm gap trên mobile để ô lớn hơn chút */
@media (max-width: 400px) {
  .grid { gap: 3px; }
}
```

---

## DetailPanel trên mobile

| Thành phần | Behavior mobile |
|-----------|----------------|
| Header (title + button) | `flexWrap: wrap` — button xuống dòng khi hẹp |
| 3 Block trên (khaiNiem, suThatThuVi, viDu) | Stack dọc — không vấn đề |
| 2 Block dưới (cauHoi, nhiemVu) | `grid 1fr 1fr` — 2 cột, mỗi cột ~155px ở 375px — đọc được |
| Font size text trong Block | 13px với lineHeight 1.7 — đọc tốt trên mobile |

Không cần thay đổi DetailPanel trong sprint 1.

---

## Module legend

`flexWrap: wrap` với `gap: 4px 12px`. Trên 375px wrap sang 2–3 hàng tự nhiên. Chấp nhận được — không chiếm quá nhiều vertical space.
