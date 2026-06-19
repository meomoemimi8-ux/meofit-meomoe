# 🔐 Đăng nhập MèoFit (Firebase Authentication)

MèoFit dùng **Firebase Authentication** để đăng nhập Google. Ưu điểm: có sẵn
**danh sách user** trong Firebase Console, và sau này dễ thêm **đồng bộ tiến độ**.

> Đoạn `firebaseConfig` trong `index.html` **không phải mật khẩu** — Firebase web config
> vốn công khai, để trên GitHub hoàn toàn an toàn. Bảo mật nằm ở Security Rules.

## Đã cấu hình
- Project Firebase: `meofit-24252`
- Bật **Authentication → Sign-in method → Google**
- **Authorized domains**: `localhost`, `fit.meomoe.com`
- Config đã dán trong `index.html` (biến `firebaseConfig`)

## 📋 Xem danh sách người dùng
1. Vào **https://console.firebase.google.com** → chọn project **meofit-24252**.
2. Menu trái: **Build → Authentication** → tab **Users**.
3. Bảng hiện mọi người đã đăng nhập: ảnh, tên, email, ngày tạo, lần đăng nhập gần nhất.
   - Có thể **tìm theo email**, **xoá user**, xem tổng số.

## Thêm domain mới (nếu đổi tên miền)
**Authentication → Settings → Authorized domains → Add domain**.

## Lỗi thường gặp
- **`auth/unauthorized-domain`** → domain đang chạy chưa có trong *Authorized domains*.
- **Popup đóng ngay** → người dùng tự đóng, không sao; bấm đăng nhập lại.
- **Ảnh đại diện không hiện** → app đã thêm `referrerpolicy="no-referrer"`, bình thường.

## Sau này muốn đồng bộ tiến độ (tuỳ chọn)
Bật **Firestore Database** + viết code đọc/ghi theo `uid` (báo Mèo làm). Rules mẫu:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
