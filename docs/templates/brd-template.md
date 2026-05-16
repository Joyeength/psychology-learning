# Business Requirement Document (BRD)

## 1. Introduction

### 1.1 Purposes

*- Mô tả mục đích xây dựng hệ thống/dự án và đối tượng phục vụ.*

*- Xác định rõ tài liệu này nhằm giải quyết yêu cầu nghiệp vụ gì.*

*- Liệt kê các nội dung chính của tài liệu*

### 1.2 References

| Tên tài liệu  | Mô tả/Link                                                               |
| :--------------- | :------------------------------------------------------------------------- |
| *Tài liệu 1* | *Danh sách các tài liệu tham khảo liên quan (VD: Product Backlog)* |

---

### 2. Business Requirements

*Bảng phân loại mức độ ưu tiên các requirement:*

| Value Rating | Description | Nhóm tính năng/Mục tiêu tương ứng                  |
| :----------- | :---------- | :--------------------------------------------------------- |
| 1            | Critical    | *Mô tả tính năng bắt buộc phải có*               |
| 2            | High        | *Mô tả tính năng ưu tiên cao*                      |
| 3            | Medium      | *Mô tả tính năng ưu tiên trung bình*              |
| 4            | Low         | *Mô tả tính năng ưu tiên thấp*                    |
| 5            | Future      | *Mô tả tính năng sẽ phát triển trong tương lai* |

### 2.1 Need

*Mô tả chi tiết nhu cầu và các vấn đề cần giải quyết của dự án.*

### 2.2 Business Goals

*Liệt kê các mục tiêu của dự án theo từng giai đoạn hoặc lộ trình thời gian cụ thể (ví dụ: mục tiêu năm 2024, 2025).*

### 2.3 Success Metrics

*Đưa ra các chỉ số dùng để đo lường sự thành công của dự án. Nếu chưa có chỉ số định lượng, có thể dùng các tiêu chí đánh giá lợi ích mang lại cho người dùng.*

---

## 3. Stakeholder Requirements

### 3.1 Stakeholder Summary

#### 3.1.1 Sơ đồ phối hợp

*Chèn sơ đồ (diagram) thể hiện luồng phối hợp giữa các phòng ban và giai đoạn thực hiện dự án. Liệt kê quy trình làm việc nếu có.*

#### 3.1.2 Stakeholder list

*Key Stakeholder: Người ra quyết định chính.*
*Important Stakeholder: Người phối hợp thường xuyên, ảnh hưởng đến quyết định.*

| Stakeholder          | Description, Characteristics | List stakeholder             | Type              | Notes              |
| :------------------- | :--------------------------- | :--------------------------- | :---------------- | :----------------- |
| *Phòng ban/Nhóm* | *Vai trò trong dự án*   | *Tên người phụ trách* | *Key/Important* | *Ghi chú thêm* |

### 3.2 Stakeholder Requirements

*Đường dẫn đến file quản lý yêu cầu chi tiết (ví dụ: Product Backlogs).*

---

## 4. Business Process

### 4.1 As-is process

*Mô tả quy trình nghiệp vụ hiện tại. Ưu tiên sử dụng sơ đồ (diagram) và liệt kê các "pain point" (nỗi đau/vấn đề) mà dự án sẽ giải quyết.*

### 4.2 To-be process

*Mô tả quy trình sẽ được thực hiện sau khi hoàn thành dự án. Sử dụng sơ đồ và ghi chú các điểm thay đổi, cải thiện so với quy trình cũ.*

### 4.3 Context Diagram

*Chèn sơ đồ mô tả mối quan hệ của hệ thống/dự án đang thực hiện với các yếu tố, dự án hoặc hệ thống bên thứ 3 khác.*

---

## 5. Scope & Limitation

### 5.1 Solution scope

*Mô tả phạm vi của giải pháp theo từng giai đoạn.*

#### 5.1.1 In-scope

*Liệt kê các hạng mục nằm trong phạm vi phát triển của dự án (chia theo mốc thời gian nếu cần).*

#### 5.1.2 Out-scope

*Liệt kê các hạng mục nằm ngoài phạm vi hoặc không còn hỗ trợ.*

### 5.2 Limitation

*Mô tả các giới hạn của giải pháp về mặt công nghệ, con người, tài nguyên...*

### 5.3 Constrains

*Các ràng buộc của giải pháp (ví dụ: chính sách bảo mật, Data Policy của công ty).*

### 5.4 Assumptions

*Các yếu tố giả định để dự án thành công (ví dụ: thói quen người dùng, định hướng phát triển...).*

### 5.5 Dependencies

*Các yếu tố phụ thuộc của giải pháp đối với các hệ thống/team khác.*

---

## 6. Solution Requirements

*Yêu cầu cụ thể về giải pháp*

### 6.1 Functional Requirements

#### 6.1.1 Danh sách các yêu cầu chức năng

| ID      | Function               | Description                         | Note                   |
| :------ | :--------------------- | :---------------------------------- | :--------------------- |
| FR-0001 | *Tên chức năng*  | *Mô tả chức năng chi tiết*  | *Valid / Outdated*  |

#### 6.1.2 Functions - System Readiness - Hiện trạng bàn giao

| ID      | Function               | System Readiness | Delivery Status | *Stakeholder 1* | *Stakeholder 2* | ... |
| :------ | :--------------------- | :--------------- | :-------------- | :---------------- | :---------------- | :-- |
| FR-0001 | *Tên tính năng*  | Yes/No           | Yes/No          | X                 | X                 | ... |

### 6.2 Non-functional Requirements

| ID       | Function/Description                                                |
| :------- | :------------------------------------------------------------------ |
| NFR-0001 | *Yêu cầu về hiệu năng (VD: Thời gian load chart < 3s)*     |
| NFR-0002 | *Yêu cầu về giao diện (VD: Tương thích Desktop, Mobile)*  |
| NFR-0003 | *Yêu cầu về bảo mật (VD: Tuân thủ Data Policy)*            |

---

## 7. Supplemental Information

### 7.1 Glossary

| Term                | Stand for                  | Description                  |
| :------------------ | :------------------------- | :--------------------------- |
| *Thuật ngữ 1*  | *Từ viết đầy đủ*  | *Giải thích ý nghĩa*  |

### 7.2 Appendix

*Đính kèm các tài liệu bổ sung, bảng biểu chi tiết hoặc hình ảnh minh họa nếu có.*

### 7.3 Approval

*Phần ký duyệt của các Stakeholder liên quan để chốt yêu cầu nghiệp vụ.*
