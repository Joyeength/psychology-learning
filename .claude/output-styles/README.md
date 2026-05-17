# Output Styles — Wired 5 Levels

Mỗi file định nghĩa cách Claude giải thích khái niệm tâm lý học cho đúng đối tượng.

Dựa trên **Wired 5 Levels** framework: cùng một khái niệm, giải thích khác nhau tùy người nghe.
Research đầy đủ: `docs/research/wired-5-levels.md` + `docs/research/combined-learning-questioning-framework.md`

## Files

| File | Wired Level | Đối tượng |
|------|------------|----------|
| `level-1-child.md` | Level 1 — Child | Không có nền — lần đầu nghe đến khái niệm này |
| `level-2-teen.md` | Level 2 — Teen | Nghe qua nhưng không giải thích được |
| `level-3-undergrad.md` | Level 3 — Undergrad | Giải thích được, chưa áp dụng |
| `level-4-grad.md` | Level 4 — Grad | Đã áp dụng, muốn phản biện |
| `level-5-expert.md` | Level 5 — Expert | Có thể dạy người khác |

## Cách dùng

Kích hoạt thủ công khi giải thích:
```
Giải thích [khái niệm] theo output style: level-2-teen
```

Hoặc agent tự chọn sau khi chạy LOCATE (xem `.claude/rules/learning-loop.md`).

## Nguyên tắc cốt lõi

Feynman Principle: **nếu không giải thích được cho Level 1, bạn chưa thực sự hiểu.**

Complexity ramp phải đều — không nhảy từ Level 1 lên Level 4 vì gây cognitive overload.
Analogy ở Level 1–2 phải đúng về cấu trúc, không chỉ hình thức bề ngoài.
