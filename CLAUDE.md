# Nori Client

Frontend của ứng dụng theo dõi sức khỏe Nori.

## Giới thiệu đề tài

NORI — Ứng dụng theo dõi sức khỏe cá nhân tích hợp AI

### Vấn đề / Lý do chọn đề tài
- Dữ liệu sức khỏe bị rời rạc — mỗi thứ ghi một nơi
- Không có ai phân tích dữ liệu để đưa ra lời khuyên cá nhân hóa
- Thiếu động lực/nhắc nhở để duy trì thói quen tốt

### Mục tiêu đề tài
Xây dựng ứng dụng web tập trung dữ liệu sức khỏe cá nhân vào 1 nơi, kèm AI phân tích để đưa ra gợi ý phù hợp với từng người dùng.

### Đối tượng sử dụng
Người dùng cá nhân muốn theo dõi và cải thiện sức khỏe hàng ngày — không cần kiến thức y khoa.

### Phạm vi chức năng (4 mảng chính)
| Mảng | Người dùng làm gì | AI hỗ trợ gì |
|------|-------------------|--------------|
| Tâm trạng | Ghi nhật ký cảm xúc (vui/buồn/stress/mệt) | Gợi ý cách cải thiện tinh thần |
| Thể hình | Theo dõi cân nặng, BMI, lưu hoạt động tập | Gợi ý bài tập phù hợp mục tiêu |
| Dinh dưỡng | Ghi nhật ký ăn uống, theo dõi calo | Phân tích bữa ăn, gợi ý thực đơn |
| Ngủ nghỉ | Ghi giờ ngủ, đánh giá chất lượng | Gợi ý lịch ngủ tốt hơn |

### Vai trò của AI
AI không phải tính năng chính/trung tâm, mà là lớp hỗ trợ chạy ngầm:
- Phân tích dữ liệu sức khỏe đã ghi nhận
- Gợi ý thói quen tốt hơn dựa trên xu hướng dữ liệu
- Tạo báo cáo cá nhân (tuần/tháng)
- Nhắc nhở người dùng (ví dụ: "Bạn chưa ghi nhật ký hôm nay")

### Công nghệ sử dụng
- Backend: Node.js, Express, PostgreSQL (Supabase), JWT (xác thực)
- Frontend: React, Vite
- AI: Tích hợp Claude API (phase sau)

## Stack
- React + Vite

## Cách chạy
```bash
npm run dev   # chạy trên port 5173
```

## Hướng dẫn cho AI
- Đây là dự án học tập — giải thích từng bước, đưa skeleton để user tự viết, không viết thay
- User đang học frontend từ đầu
- Cách giải thích hiệu quả với user này:
  - So sánh khái niệm mới với cái user **đã biết**
  - Dùng **chính code user vừa viết** làm ví dụ minh họa, không dùng ví dụ trừu tượng
  - Vẽ sơ đồ luồng (ASCII) khi giải thích thứ tự xử lý / flow
  - Kết thúc bằng 1 câu tóm tắt ngắn gọn ("Tóm lại — 1 câu: ...")
- Cách viết skeleton hiệu quả với user này:
  - Giữ nguyên phần code user đã biết/đã quen (try/catch, res.status, cấu trúc hàm) — chỉ để trống (`// TODO`) đúng phần kiến thức MỚI cần học
  - Đánh số TODO (`TODO 1`, `TODO 2`...) nếu có nhiều chỗ trống, để user dễ trả lời theo thứ tự
  - Trước hoặc sau skeleton, đặt 1 câu hỏi gợi mở liên quan đến phần TODO quan trọng nhất — để user tự suy nghĩ trước khi viết, không chỉ chép
  - Khi có component/hàm tương tự đã viết trước đó, chỉ rõ "giống X, chỉ khác chỗ Y" thay vì giải thích lại từ đầu

---

## Tiến độ

### 🔄 Phase 2 — Authentication (ĐANG LÀM)
Backend (nori-server) đã xong hoàn toàn — xem nori-server/CLAUDE.md.

- [x] Cài `react-router-dom` + `axios` (đã có trong package.json)
- [ ] ĐANG LÀM TIẾP — Tạo trang Register (/register)
- [ ] Trang Login (/login)
- [ ] Lưu token vào localStorage
- [ ] Protected Route (chặn trang nếu chưa đăng nhập)

API backend đã sẵn sàng để gọi:
- POST http://localhost:5000/api/auth/register — body { name, email, password }
- POST http://localhost:5000/api/auth/login — body { email, password }
- GET http://localhost:5000/api/auth/me — header Authorization: Bearer <token>

### ⏳ Phase 3 — Tâm trạng
- [ ] Trang ghi tâm trạng, lịch sử cảm xúc

### ⏳ Phase 4 — Thể hình
- [ ] Form ghi buổi tập, biểu đồ cân nặng

### ⏳ Phase 5 — Dinh dưỡng
- [ ] Form ghi bữa ăn, tổng calo trong ngày

### ⏳ Phase 6 — Ngủ nghỉ
- [ ] Form ghi giấc ngủ, thống kê số giờ

### ⏳ Phase 7 — AI Integration
- [ ] Hiển thị gợi ý AI, báo cáo sức khỏe

### ⏳ Phase 8 — Dashboard
- [ ] Trang tổng quan, biểu đồ (recharts), xuất PDF
