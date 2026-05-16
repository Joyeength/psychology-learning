# UX Flow — Cold Start Experience

> Sprint 1 — 2026-05-16
> Owner: ux_designer

---

## 1. User lần đầu vào URL (first-time user, không có storage)

```
URL nhập vào trình duyệt
    → DNS resolve + GitHub Pages CDN response (có thể 0.5–2s)
    → Browser bắt đầu render HTML → hiện loading placeholder "Đang tải..."
    → React mount xong
    → window.storage.get("psych100_done") → { value: null }
        → completed = Set() rỗng
        → Progress bar: 0/100
    → Toàn bộ 100 nút grid hiện, không ngày nào highlight
    → DetailPanel: trạng thái empty — "Chọn một ngày để bắt đầu hành trình"
```

**Điểm UX cần chú ý:** Lần đầu mở app, user nhìn vào 100 nút số trên nền tối. Không có onboarding text, không có hướng dẫn. Đây là thiết kế có chủ đích: grid tự nó là câu hỏi mời ("ngày nào bạn muốn khám phá?"). DetailPanel empty state với icon MousePointerClick và dòng text đủ để gợi hành động. Không cần thêm modal hay tooltip.

---

## 2. User click ngày — loading state khi fetch lesson

```
User click nút ngày [N]
    → selected = N
    → useEffect([selected]) fire
    → Guard check: cache[N] không có, fetchingRef không có N
    → loadingDays.add(N) → fetch("./lessons/N.json") bắt đầu
    → DetailPanel hiện:
        - Header: "ngày N · [Tên module]" + tên bài học
        - Body: spinner icon (RefreshCw đang quay) + "Đang tải..."
        - Nút "Đánh dấu xong": không hiện (chỉ hiện khi dc loaded và không error)
    → Fetch xong (thường < 300ms trên GitHub Pages CDN)
    → loadingDays.delete(N)
    → 5 Block card hiện ra theo thứ tự: khaiNiem → suThatThuVi → viDu → cauHoi + nhiemVu (grid 2 cột)
    → Nút "Đánh dấu xong" xuất hiện
```

**Về thời gian:** JSON file mỗi ngày nhỏ (< 1 KB). GitHub Pages CDN có thời gian phản hồi tốt. Spinner sẽ hiện rất nhanh — nhưng không bỏ đi: nó là feedback quan trọng cho người dùng biết có gì đó đang xảy ra, đặc biệt trên mạng 3G yếu.

---

## 3. User quay lại ngày đã xem — cache hit

```
User click ngày [N] (đã xem trước đó trong cùng session)
    → cache[N] đã có → không fetch lại
    → DetailPanel hiện nội dung ngay lập tức, không có loading state
    → Không có flicker, không có spinner
```

---

## 4. User mark complete → quay lại lần sau (returning user)

```
Session 1:
    User đọc ngày 1 → click "Đánh dấu xong"
    → completed.add(1) → window.storage.set("psych100_done", "[1]")
    → Nút đổi thành badge "Hoàn thành" (màu xanh)
    → Grid: nút ngày 1 highlight accent + checkmark nhỏ ở góc phải dưới

Session 2 (hôm sau, tab mới):
    → URL mở
    → window.storage.get("psych100_done") → { value: "[1]" }
    → completed = Set([1])
    → Grid: ngày 1 đã highlight ngay khi render, trước khi user click gì
    → Progress bar: 1/100
```

---

## 5. Error state — lesson không tải được (offline hoặc file lỗi)

```
User click ngày [N]
    → fetch("./lessons/N.json") thất bại (network error hoặc HTTP lỗi)
    → cache[N] = { error: true, msg: "..." }
    → DetailPanel hiện:
        - Header: tên ngày + module (vẫn hiện, lấy từ TOPICS / getMod)
        - Body: text đỏ "Không tải được nội dung: [msg]"
        - Nút "Thử lại" → click → xóa cache[N] → trigger fetch lại
        - Nút "Đánh dấu xong": không hiện
```

**Lưu ý copy tiếng Việt:** Thông báo lỗi hiện tại lộ message kỹ thuật ("HTTP 404") ra trực tiếp cho user. Sprint 1 chưa sửa (ngoài scope redesign), nhưng đây là điểm cần cải thiện ở sprint sau.

---

## 6. User dùng xong 100 ngày (completed user)

```
completed.size = 100
    → Progress bar: 100/100, thanh bar tràn đầy màu #534AB7
    → Toàn bộ 100 nút grid highlight accent + checkmark
    → Không có màn hình "chúc mừng" đặc biệt — out-of-scope sprint 1
```
