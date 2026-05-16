# Sprint 1 — User Stories & Acceptance Criteria

---

## User Stories

### US-1 — Truy cập app qua URL public
**As a** người dùng quan tâm tâm lý học,
**I want** mở app qua một URL công khai trên trình duyệt bất kỳ,
**so that** tôi có thể học mà không cần cài đặt gì hay chạy code local.

### US-2 — Progress được lưu giữa các session
**As a** học viên đang học giữa chừng,
**I want** các ngày tôi đã đánh dấu "đã xong" được giữ nguyên khi tôi đóng tab và mở lại sau,
**so that** tôi không mất tiến độ và biết mình đang ở đâu trong chuỗi 100 ngày.

### US-3 — App load nhanh và đúng trên mobile
**As a** người dùng học trên điện thoại lúc đi đường,
**I want** app load trong vòng vài giây và grid 10×10 hiển thị đầy đủ không vỡ layout,
**so that** tôi có thể học trên thiết bị quen thuộc nhất mà không cần laptop.

### US-4 — Chia sẻ link cho người khác
**As a** học viên muốn rủ bạn cùng học,
**I want** copy URL gửi cho bạn và bạn ấy mở ra thấy đúng app với preview đẹp,
**so that** việc giới thiệu app không cần giải thích cách chạy.

### US-5 — Deploy bằng quy trình đơn giản, lặp lại được
**As a** solobuilder đang maintain app,
**I want** chạy một lệnh (hoặc push lên branch chính) để deploy version mới lên production,
**so that** tôi có thể release fix/update nhanh mà không sợ sai sót thủ công.

### US-6 — App an toàn để mở public
**As a** owner của app,
**I want** đảm bảo app không có lỗ hổng bảo mật rõ ràng (XSS, storage leak, CSP yếu),
**so that** user dùng không bị rủi ro và mình không tự tạo nợ kỹ thuật.

---

## Acceptance Criteria

### AC cho US-1 — Truy cập qua URL
- [ ] AC-1.1: Mở URL trên Chrome desktop hiển thị grid 10×10 đầy đủ trong < 3 giây trên mạng 4G mô phỏng.
- [ ] AC-1.2: Click một ngày bất kỳ → load và hiển thị 5 block nội dung (khaiNiem, suThatThuVi, viDu, cauHoi, nhiemVu).
- [ ] AC-1.3: URL hoạt động trên ít nhất 4 trình duyệt: Chrome, Firefox, Safari, mobile Safari/Chrome.

### AC cho US-2 — Persistent storage
- [ ] AC-2.1: Mark một ngày "đã xong" → đóng tab → mở lại URL → ngày đó vẫn highlight "đã xong".
- [ ] AC-2.2: Mark 5 ngày bất kỳ → reload trang → cả 5 ngày vẫn được giữ.
- [ ] AC-2.3: Storage dùng IndexedDB (hoặc localStorage fallback nếu IndexedDB không khả dụng), không phụ thuộc cookie.

### AC cho US-3 — Mobile + performance
- [ ] AC-3.1: Trên màn 375px (iPhone SE), grid 10×10 không bị overflow horizontal, không cần zoom để click ngày.
- [ ] AC-3.2: Lighthouse Performance score ≥ 85 trên mobile.
- [ ] AC-3.3: First Contentful Paint < 2 giây trên kết nối Fast 3G mô phỏng.

### AC cho US-4 — Shareable link
- [ ] AC-4.1: Paste URL vào Messenger/Zalo/Twitter hiển thị preview card với title, description, hình ảnh đại diện.
- [ ] AC-4.2: Favicon hiển thị đúng trên tab browser.
- [ ] AC-4.3: Meta tags `og:title`, `og:description`, `og:image`, `twitter:card` đều có giá trị hợp lệ.

### AC cho US-5 — Deploy pipeline
- [ ] AC-5.1: Có thể deploy production bằng một lệnh CLI hoặc một thao tác push/merge lên branch chính.
- [ ] AC-5.2: Deploy runbook documented trong `feature-release.md` đủ chi tiết để người khác làm theo.
- [ ] AC-5.3: Rollback được về version trước trong vòng < 5 phút (documented steps).

### AC cho US-6 — Security baseline
- [ ] AC-6.1: HTTP response có security headers cơ bản: CSP, X-Content-Type-Options, Referrer-Policy.
- [ ] AC-6.2: Không có inline script không hash/nonce trong production HTML (hoặc CSP cho phép explicit).
- [ ] AC-6.3: Storage không lưu PII; chỉ lưu tiến độ học (Set of day numbers).
- [ ] AC-6.4: security_engineer sign-off bằng văn bản trong qc.md hoặc release doc.
