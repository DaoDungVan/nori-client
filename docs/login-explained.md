# Giải thích chi tiết `Login.jsx` — Ôn lại từ đầu

File này giải thích **từng dòng** của `src/pages/Login.jsx`, dùng để ôn lại khi cần (qua máy khác, hoặc khi quên).

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
```

---

## Phần 1: Import (dòng 1-3)

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
```

| Import | Là gì | Dùng để |
|--------|-------|---------|
| `useState` | 1 "hook" của React | Tạo biến mà khi đổi giá trị, React tự render lại UI |
| `useNavigate` | hook của react-router | Chuyển trang bằng code (vd: sau khi login xong, tự nhảy về `/`) |
| `Link` | component của react-router | Giống thẻ `<a>` nhưng không reload lại trang |
| `api` | file bạn tự tạo | Để gọi đến backend (đã cấu hình base URL + tự gắn token) |

---

## Phần 2: Khai báo state (dòng 6-8)

```jsx
const [form, setForm] = useState({ email: '', password: '' });
```

Đây là cú pháp **destructuring** bạn đã học ở backend! Nhớ lại:
```js
const { password_hash, ...safeUser } = user;  // destructuring OBJECT
```

Ở đây là destructuring **ARRAY** (dùng `[]` thay vì `{}`):

```jsx
const [form, setForm] = useState({...});
//     │      │
//     │      └── hàm để THAY ĐỔI giá trị form
//     └── giá trị HIỆN TẠI của form
```

`useState({ email: '', password: '' })` tạo ra:
- `form` = `{ email: '', password: '' }` (lúc đầu, input trống)
- `setForm` = hàm gọi để **đổi** giá trị `form`

### Tại sao không dùng biến thường (`let form = {...}`)?

```
let form = {...}     →  Đổi giá trị, nhưng React KHÔNG biết để vẽ lại UI
setForm(...)          →  Đổi giá trị, React TỰ ĐỘNG vẽ lại UI (re-render)
```

> **Quy tắc cốt lõi của React**: muốn UI tự cập nhật khi dữ liệu đổi → phải dùng `useState`, không dùng biến thường.

```jsx
const [error, setError] = useState('');
```
Tương tự — `error` là chuỗi rỗng lúc đầu, dùng để hiện thông báo lỗi.

```jsx
const navigate = useNavigate();
```
Gọi hook này ra 1 hàm `navigate`, dùng để chuyển trang bằng code (sẽ thấy ở dòng 22).

---

## Phần 3: Hàm `handleChange` (dòng 10-12)

```jsx
const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};
```

Đây là hàm chạy **mỗi khi user gõ vào input**. Tách ra từng phần:

### `e` là gì?
`e` = "event" — object chứa thông tin về hành động vừa xảy ra (gõ chữ). `e.target` = chính cái `<input>` đang được gõ.

### Visual hóa khi user gõ vào ô email:

```
User gõ "a" vào input có name="email"
        │
        ▼
e.target.name = "email"
e.target.value = "a"
        │
        ▼
setForm({ ...form, email: "a" })
        │
        ▼
form bây giờ = { email: "a", password: "" }
        │
        ▼
React tự render lại → input email hiện chữ "a"
```

### Vì sao có `...form` (spread)?

Nhớ lại `...rest` đã học ở backend (rest operator), đây là **spread operator** — anh em của nó, nhưng làm ngược lại: **"trải" toàn bộ field của `form` ra**.

```jsx
{ ...form, [e.target.name]: e.target.value }
```

Đọc thành lời: *"Copy tất cả field cũ của `form`, sau đó GHI ĐÈ field tên `e.target.name` bằng giá trị mới"*.

**Tại sao cần `...form`?** Nếu KHÔNG có nó:
```jsx
setForm({ [e.target.name]: e.target.value });
// form mới CHỈ CÓ field vừa gõ, field còn lại bị MẤT!
// vd: gõ email → form = { email: "a" } → password biến mất luôn
```

### `[e.target.name]` — dấu `[]` để làm gì?

Đây là cú pháp "computed property name" — nghĩa là **tên field lấy từ 1 biến**, không gõ cứng tên.

```jsx
// Nếu gõ cứng (sai, vì input nào cũng gọi chung handleChange):
{ email: e.target.value }

// Linh hoạt (đúng) — tên field tùy theo input nào đang gõ:
{ [e.target.name]: e.target.value }
```

→ Đây là lý do **1 hàm `handleChange` dùng được cho CẢ 2 input** (email và password) — vì tên field được lấy động từ `name="..."` của input đó.

---

## Phần 4: Hàm `handleSubmit` (dòng 14-26)

```jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const res = await api.post('/auth/login', form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    }
};
```

### `e.preventDefault()` — dòng quan trọng nhất dễ bị quên

HTML form mặc định khi submit sẽ **reload lại cả trang** (hành vi cũ từ thời web chưa có JS). `e.preventDefault()` = "chặn hành vi mặc định đó lại", để code JS tự xử lý thay vì reload.

```
Không có preventDefault():  Bấm Submit → trang RELOAD → mất hết state → lỗi
Có preventDefault():         Bấm Submit → code chạy bình thường, không reload
```

### `setError('')` — xóa lỗi cũ

Mỗi lần bấm Submit, xóa lỗi lần trước (nếu có) trước khi thử lại.

### `await api.post('/auth/login', form)` — đây là phần kết nối Backend

Nhớ lại sơ đồ:
```
form = { email: "...", password: "..." }
        │
        ▼
api.post('/auth/login', form)
        │
        ▼
Thực chất gọi: POST http://localhost:5000/api/auth/login
              Body: form (chính là { email, password })
        │
        ▼
Backend (login trong authController.js) xử lý — CHÍNH LÀ CODE BẠN ĐÃ VIẾT
        │
        ▼
Trả về: { success: true, token: "...", user: {...} }
        │
        ▼
res.data = chính object đó
```

`await` — bắt buộc vì gọi API tốn thời gian (giống `await pool.query(...)` ở backend, bạn đã quen điều này rồi).

### 3 dòng tiếp theo — lưu kết quả

```jsx
localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));
navigate('/');
```

- `localStorage` = "bộ nhớ" của trình duyệt, **không mất khi đóng tab/tắt máy** (khác với `useState` — mất ngay khi reload trang)
- `JSON.stringify(...)` — vì `localStorage` **chỉ lưu được chuỗi (string)**, không lưu được object trực tiếp → phải biến object thành chuỗi JSON trước
- `navigate('/')` — chuyển trang về Home

### `catch (err)` — khi backend trả lỗi (401, 400...)

```jsx
setError(err.response?.data?.message || 'Login failed');
```

`err.response.data` chính là cái JSON lỗi backend trả về, ví dụ:
```json
{ "success": false, "message": "Email hoặc mật khẩu không đúng" }
```

`?.` (optional chaining) — để tránh lỗi nếu `err.response` không tồn tại (vd: mất mạng, không có response nào cả). `|| 'Login failed'` — nếu không lấy được message thì dùng câu mặc định.

---

## Phần 5: JSX — phần hiển thị (dòng 28-51)

```jsx
<form onSubmit={handleSubmit}>
```
Khi user bấm nút submit (hoặc Enter) → React gọi `handleSubmit`.

```jsx
<input
    name="email"
    value={form.email}        // input LUÔN hiện đúng giá trị trong state
    onChange={handleChange}   // mỗi lần gõ → gọi handleChange
/>
```

Đây gọi là **"controlled input"** — input không tự quản lý giá trị của nó, mà **React (qua state `form`) quản lý**. Sơ đồ vòng lặp:

```
┌─────────────────────────────────────────────┐
│                                                 │
│   User gõ chữ                                  │
│        │                                        │
│        ▼                                        │
│   onChange chạy → setForm(...)                  │
│        │                                        │
│        ▼                                        │
│   React re-render → input lấy value={form.email}│
│        │                                        │
└────────┴── (lặp lại mỗi lần gõ 1 ký tự) ─────────┘
```

```jsx
{error && <p style={{ color: 'red' }}>{error}</p>}
```
`&&` ở đây là "mẹo" hay dùng trong JSX: nếu `error` là chuỗi rỗng (`falsy`) → không hiện gì; nếu `error` có nội dung (`truthy`) → hiện `<p>`.

---

## Tóm lại — toàn bộ vòng đời 1 lần Login

```
1. User gõ email/password → handleChange → setForm → UI cập nhật
2. User bấm "Login" → handleSubmit chạy
3. preventDefault() chặn reload trang
4. api.post gửi form lên backend
5a. Thành công → lưu token+user vào localStorage → navigate('/')
5b. Thất bại → setError(...) → hiện dòng đỏ trên UI
```

`Register.jsx` hoạt động **gần như giống hệt** — chỉ khác endpoint (`/auth/register`) và có thêm field `name`.

---

# Giải thích chi tiết `Register.jsx` — So sánh với Login.jsx

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
```

## So sánh trực tiếp với Login.jsx — chỉ 4 điểm khác

| Vị trí | Login.jsx | Register.jsx | Vì sao khác |
|--------|-----------|---------------|-------------|
| State ban đầu | `{ email: '', password: '' }` | `{ name: '', email: '', password: '' }` | Register cần thêm họ tên |
| Endpoint gọi API | `api.post('/auth/register', form)` | `api.post('/auth/register', form)` | Gọi đúng route backend tương ứng — nhớ lại `authRoutes.js`: `router.post('/register', register)` và `router.post('/login', login)` |
| Input trong form | 2 input (email, password) | 3 input (name, email, password) | Thêm 1 `<input name="name">`, dùng CHUNG `handleChange` vì đã viết linh hoạt bằng `[e.target.name]` |
| Message lỗi mặc định | `'Login failed'` | `'Registration failed'` | Chỉ là chuỗi text khác, không ảnh hưởng logic |

## Phần KHÔNG đổi (logic lõi giống 100%)

```
handleChange       → giống hệt, không sửa gì (linh hoạt theo name input)
handleSubmit       → cấu trúc giống hệt: preventDefault → try/catch → lưu localStorage → navigate
localStorage logic → giống hệt
controlled input   → giống hệt (value={form.x} + onChange={handleChange})
```

## Sơ đồ — vì sao chỉ cần đổi 1 dòng API mà cả luồng vẫn đúng

```
form = { name, email, password }   (Register)
form = { email, password }          (Login)
        │                                  │
        ▼                                  ▼
api.post('/auth/register', form)    api.post('/auth/login', form)
        │                                  │
        ▼                                  ▼
Backend: register()                 Backend: login()
(INSERT user mới)                   (so sánh password đã có)
        │                                  │
        └──────────────┬───────────────────┘
                        ▼
        CẢ HAI đều trả về: { success, token, user }
                        ▼
        → Code frontend xử lý response GIỐNG NHAU
          (lưu localStorage, navigate('/'))
```

→ Đây là lý do `handleSubmit` của 2 file gần như **copy-paste** được — vì backend đã thiết kế để **trả về cùng 1 dạng response** (`{ token, user }`) cho cả `register` và `login`. Thiết kế API nhất quán giúp code frontend cũng nhất quán theo.
