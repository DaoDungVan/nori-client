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

## Quyết định ngôn ngữ
- **UI/giao diện**: tiếng Anh (project dùng cho CV/portfolio, cần nhìn chuyên nghiệp)
- **Hội thoại với AI**: tiếng Việt (hoặc ngôn ngữ user chọn) — AI luôn trả lời theo ngôn ngữ user dùng
- Code, biến, comment: tiếng Việt vẫn giữ như cũ (không bắt buộc đổi)

## Hướng dẫn cho AI
- Đây là dự án học tập — giải thích từng bước, đưa skeleton để user tự viết, không viết thay
- User đang học frontend từ đầu
- Cách giải thích hiệu quả với user này:
  - So sánh khái niệm mới với cái user **đã biết**
  - Dùng **chính code user vừa viết** làm ví dụ minh họa, không dùng ví dụ trừu tượng
  - Vẽ sơ đồ luồng (ASCII) khi giải thích thứ tự xử lý / flow
  - Kết thúc bằng 1 câu tóm tắt ngắn gọn ("Tóm lại — 1 câu: ...")
- Cách viết skeleton hiệu quả với user này:
  - Khi có component/hàm tương tự đã viết trước đó, chỉ rõ "giống X, chỉ khác chỗ Y" thay vì giải thích lại từ đầu
- **CẬP NHẬT QUAN TRỌNG (bài học từ thực tế)**: User cần đẩy nhanh tiến độ vì sắp làm CV/portfolio, nhưng từng bị đẩy quá nhanh tới mức **code chạy đúng mà user KHÔNG THỰC SỰ HIỂU** (phát hiện ở Phase 2, phải dừng lại ôn lại Login.jsx từng dòng — xem `docs/login-explained.md`).
  - **Tốc độ phải khớp với mức hiểu thực sự, không phải khớp với việc code chạy được.** Code chạy đúng KHÔNG đồng nghĩa user đã hiểu.
  - Định kỳ hỏi xác nhận hiểu (không chỉ hỏi "chạy được chưa") trước khi chuyển sang phần mới, đặc biệt sau khi giới thiệu khái niệm mới (hook, state, async...)
  - Vẫn đưa **skeleton + `// TODO`** để user tự điền — KHÔNG viết code đầy đủ thay user (đã bị từ chối 1 lần ở Phase 3/Mood)
  - Kèm **sơ đồ architecture/luồng dữ liệu** (ASCII) để tăng tốc hiểu, và khi có pattern lặp lại thì nói "giống X, chỉ khác Y"
  - Nếu user nói "chưa hiểu" → dừng hẳn việc thêm code mới, quay lại giải thích từng dòng của code đã có trước

---

## Tiến độ

### 🔄 Phase 2 — Authentication (ĐANG LÀM)
Backend (nori-server) đã xong hoàn toàn — xem nori-server/CLAUDE.md.

- [x] Cài `react-router-dom` + `axios`
- [x] `src/services/api.js` — axios instance, interceptor tự gắn token
- [x] `src/pages/Register.jsx`, `src/pages/Login.jsx`, `src/pages/Home.jsx`
- [x] `src/components/ProtectedRoute.jsx`
- [x] `src/App.jsx` — Routes: /login, /register, / (protected)
- [x] `src/main.jsx` — bọc `BrowserRouter`
- [x] `src/routes/AppRoutes.jsx` — tách Routes ra khỏi App.jsx
- [x] UI dịch sang tiếng Anh (quyết định: UI English, hội thoại AI theo ngôn ngữ user)
- [x] Favicon: `public/nori-logo.png` (logo lá xanh teal viền đậm, do AI generate)
- [x] Test full flow: Register → Home → Logout → Login — TẤT CẢ OK

### ✅ Phase 2 — HOÀN THÀNH TOÀN BỘ (backend + frontend, đã chạy được)
- ⚠️ User báo CHƯA HIỂU SÂU code Login/Register dù đã test chạy đúng → đã dừng lại ôn từng dòng
- Bài ôn chi tiết Login.jsx (useState, handleChange, handleSubmit, controlled input...) đã lưu tại `docs/login-explained.md` — đọc lại file đó để ôn nhanh
- Register.jsx hoạt động tương tự Login.jsx (chỉ khác endpoint + có thêm field `name`)
- BÀI HỌC: tốc độ làm việc phải khớp với việc user thực sự hiểu, không chỉ code chạy được — xem mục "Hướng dẫn cho AI" bên dưới đã cập nhật

### ⏸️ Phase 3 — Tâm trạng: TẠM DỪNG
Đã từng viết thử moodController.js/moodRoutes.js đầy đủ nhưng user yêu cầu xóa để tự viết theo skeleton (giống cách học Auth). Sẽ làm lại sau khi user xác nhận đã hiểu rõ Login/Register.

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
