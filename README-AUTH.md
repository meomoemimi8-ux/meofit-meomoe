# 🔐 Bật đăng nhập Google cho MèoFit

MèoFit là web tĩnh (1 file `index.html`, deploy GitHub Pages) nên dùng cách **nhẹ nhất**:
**Google Identity Services** — chỉ cần 1 *OAuth Client ID*, **không cần Firebase/server**.
Nút đăng nhập đã có sẵn ở tab **Cá nhân**; bạn chỉ cần lấy Client ID rồi dán vào.

> Đăng nhập này lấy **tên + email + ảnh đại diện** (lưu ở máy — localStorage).
> Nó KHÔNG đồng bộ tiến độ giữa các thiết bị. Nếu sau này muốn đồng bộ, nâng lên
> Firebase như bên Hanyu (xem `hsk-learning-app/SETUP-AUTH.md`).

---

## Lấy Google Client ID (~5 phút)

1. Vào **https://console.cloud.google.com** → tạo Project mới (vd `meofit`) hoặc dùng project sẵn có.
2. **APIs & Services → OAuth consent screen**:
   - Chọn **External** → Create.
   - Điền *App name* = `MèoFit`, *User support email* = email bạn, *Developer email* = email bạn → Save.
   - (Khi còn ở chế độ "Testing": vào mục **Audience/Test users** → **Add users** → thêm email Google bạn sẽ dùng để test. Hoặc bấm **Publish app** để ai cũng đăng nhập được.)
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - *Application type* = **Web application**.
   - **Authorized JavaScript origins** → Add URI, thêm CHÍNH XÁC 2 dòng:
     - `https://fit.meomoe.com`
     - `http://localhost:5520`
   - (KHÔNG cần điền *Authorized redirect URIs*.)
   - Bấm **Create** → copy **Client ID** (dạng `1234567890-abcxyz.apps.googleusercontent.com`).

## Dán vào app

Mở `index.html`, tìm dòng:

```js
const GOOGLE_CLIENT_ID=''; // 👉 DÁN Google OAuth Client ID vào đây
```

Dán Client ID vào trong dấu nháy:

```js
const GOOGLE_CLIENT_ID='1234567890-abcxyz.apps.googleusercontent.com';
```

Bump cache trong `sw.js` (đổi `meofit-vNN` lên số mới) rồi commit + push. Xong!

---

## Mẹo & lỗi thường gặp

- **Bấm nút không hiện popup** → kiểm tra *Authorized JavaScript origins* có đúng origin đang chạy không (localhost phải đúng cổng `:5520`; web thật là `https://fit.meomoe.com`, không kèm dấu `/` ở cuối).
- **Lỗi `access_denied` / `app chưa verified`** → bạn đang ở chế độ Testing mà chưa thêm email vào *Test users*, hoặc bấm **Publish app**.
- **Ảnh đại diện không hiện** → bình thường nếu Google chặn referrer; app đã thêm `referrerpolicy="no-referrer"`.
- Thử **localhost** trước (`node serve.mjs` → http://localhost:5520) cho nhanh, ổn rồi mới lên web thật.
