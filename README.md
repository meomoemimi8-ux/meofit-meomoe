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

## Đưa lên mạng — ĐÃ LIVE 🌐 https://fit.meomoe.com
- Repo: `meomoemimi8-ux/meofit-meomoe` (Public) · GitHub Pages từ branch `main` / root.
- `CNAME` = `fit.meomoe.com`; DNS quản lý ở **Cloudflare**: bản ghi `CNAME  fit → meomoemimi8-ux.github.io` (DNS only, đám mây xám).
- Hub `meomoe-multiverse` đã trỏ thẻ Fitness sang `https://fit.meomoe.com`.
- **Đây là nguồn DUY NHẤT** — sửa ở đây rồi `git push` là tự deploy. (Không còn bản tạm `/fit/` trong hub.)
- Muốn lên App Store / CH Play sau này: bọc chính web này bằng **Capacitor** hoặc **PWABuilder** — không cần viết lại.

## Nguồn tham khảo
- Nhịp tập (giây/rep) cho người mới: ACSM / hướng dẫn tempo training.
- Ảnh giải phẫu nhóm cơ: Wikimedia Commons (CC) — Gluteus maximus, Quadriceps, Hamstrings (GIF 3D),
  Pectoralis major, Latissimus dorsi, Deltoid, Rectus abdominis, Adductors, hệ cơ toàn thân.

_Made with 🎀 & 🐾_
