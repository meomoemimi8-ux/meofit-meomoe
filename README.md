# 🏋️ MèoFit — Lịch tập tại nhà

Một vũ trụ trong hệ sinh thái [Meomoe Multiverse](https://multiverse.meomoe.com).
Linh vật: **🐾 Mèo Lực Sĩ**. Đồng hành cùng bạn theo một **kế hoạch tập tại nhà không cần dụng cụ**
(Level 1 → 3), nhẹ nhàng mỗi ngày, gọn trong **dưới 1 tiếng**.

Một trang tĩnh, gói gọn trong **một file** `index.html` (không cần build).

## Có gì trong này
- **Hôm nay** — tự biết theo Thứ trong tuần là buổi nào, ước tính thời lượng, nút bắt đầu, 🔥 chuỗi ngày.
- **Lịch tuần** — T2→CN theo plan gốc, kèm lưu ý nhảy dây (T3 & T6).
- **4 buổi tập × 3 Level** — mỗi bài ghi rõ **nhóm cơ tác động** (kèm **ảnh giải phẫu** từ Wikimedia,
  có GIF 3D xoay cho mông/đùi), **gợi ý máy/biến thể ở phòng gym**, link video hướng dẫn, nhịp tempo.
- **Timer** — đếm giây theo nhịp người mới (~3–4s/rep, theo ACSM), tự nghỉ giữa hiệp, beep + rung.
- **Tiến độ** — lưu buổi đã tập + streak ngay trên máy (localStorage, khoá `meofit_history_v1`).

## Xem thử trên máy
```
node serve.mjs
```
Rồi mở http://localhost:5520

## Đưa lên mạng (GitHub Pages)
- Tạo repo riêng cho vũ trụ này, bật **GitHub Pages** (Settings → Pages → branch `main` / root).
- File `CNAME` gắn tên miền **fit.meomoe.com**.
- Tại nhà cung cấp tên miền `meomoe.com`, thêm bản ghi:
  `CNAME  fit  →  <tài-khoản>.github.io`
- Khi subdomain đã chạy: đổi `href` của thẻ Fitness trong hub `meomoe-multiverse/index.html`
  sang `https://fit.meomoe.com` (hiện đang trỏ tạm vào `fit/` cùng repo hub).

## Nguồn tham khảo
- Nhịp tập (giây/rep) cho người mới: ACSM / hướng dẫn tempo training.
- Ảnh giải phẫu nhóm cơ: Wikimedia Commons (CC) — Gluteus maximus, Quadriceps, Hamstrings (GIF 3D),
  Pectoralis major, Latissimus dorsi, Deltoid, Rectus abdominis, Adductors, hệ cơ toàn thân.

_Made with 🎀 & 🐾_
