# Combined Framework: Wired×Bloom + Questioning Tools

## Nguyên lý kết hợp

Hai framework giải quyết hai chiều khác nhau của cùng một quá trình học:

- **Wired × Bloom** = *trục dọc* — bạn đang ở đâu và đi đến đâu (depth progression)
- **Questioning frameworks** = *trục ngang* — bạn dùng công cụ gì ở từng tầng (breadth & depth tools)

Chúng cần nhau: Wired×Bloom cho bạn biết *khi nào* dùng tool nào, còn questioning frameworks là *công cụ thực tế* để xử lý kiến thức ở mỗi giai đoạn.

---

## Mô hình kết hợp — Learning Loop

```
┌─────────────────────────────────────────────────────────┐
│  PRE-LEARN: QFT                                         │
│  → Đặt nhiều câu hỏi tùy ý → Prioritize 3 câu           │
│  → Biết mình muốn biết gì trước khi đọc                 │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  LOCATE → EXPLAIN (Wired×Bloom protocol)                │
│  Xác định level → nhận giải thích đúng tầm              │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  PROCESS — chọn questioning tool theo level:            │
│                                                         │
│  Level 1–2 │ 5W1H     → bao phủ toàn bộ concept space   │
│  Level 3   │ 5W1H     → xong rồi dùng Socratic bắt đầu  │
│            │ + Socratic (Clarification + Evidence)      │
│  Level 4–5 │ Socratic → Assumptions + Implications + Meta│
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  GATE → advance hoặc loop lại                           │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  POST-LEARN: QFT lần 2                                  │
│  → 3 câu ban đầu đã được trả lời chưa?                  │
│  → Câu hỏi mới nào nổi lên? → Prioritize cho lần sau    │
└─────────────────────────────────────────────────────────┘
```

---

## Điểm mấu chốt

**QFT bọc ngoài cả loop** — nó không thuộc về level nào, nó là meta-tool chạy trước và sau. Làm vậy thì learner không chỉ tiêu thụ content mà còn *sở hữu câu hỏi của chính mình*.

**5W1H = scaffolding ngang** ở Level 1–3, giúp xây mental model đủ rộng trước khi đào sâu. Nhảy vào Socratic quá sớm sẽ thất bại vì learner chưa có gì để phản biện.

**Socratic = lever đòn bẩy** — chỉ mạnh khi đã có nền. Kích hoạt từ Level 3 trở lên.

---

## Mapping tool → Bloom's level

| Questioning Tool                       | Bloom's tương ứng    | Wired Level |
| -------------------------------------- | ----------------------- | ----------- |
| QFT (pre)                              | — (meta, trước học) | tất cả    |
| 5W1H — What/How                       | Remember + Understand   | 1–2        |
| 5W1H — Why/Who/When/Where             | Understand + Apply      | 2–3        |
| Socratic — Clarification + Evidence   | Apply + Analyze         | 3           |
| Socratic — Assumptions + Implications | Analyze + Evaluate      | 4           |
| Socratic — Meta                       | Evaluate + Create       | 5           |
| QFT (post)                             | — (meta, sau học)     | tất cả    |

---

## Ứng dụng vào psychology challenge

Với cấu trúc JSON hiện tại (`cauHoi` + `nhiemVu`), có thể map như sau:

| Field       | Kết hợp                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------ |
| `cauHoi`  | Level 1–2: câu 5W1H (What/Why/How) · Level 3+: câu Socratic (Assumptions/Implications) |
| `nhiemVu` | QFT mini: "Trước khi học ngày mai, đặt 3 câu hỏi bạn muốn biết về topic đó"  |

---

→ Xem: [[questioning-frameworks]], [[learning-framework-wired-bloom]], [[blooms-taxonomy]], [[wired-5-levels]]
