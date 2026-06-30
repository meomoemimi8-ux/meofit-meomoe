# 🐱📸 Mèo Dinh Dưỡng AI — hướng dẫn tạo Worker (Bước 1)

Mục tiêu: tạo 1 Cloudflare Worker riêng cho MèoFit để soi ảnh món ăn (giữ key Gemini bí mật, người dùng không cần key).

## Các bước trên Cloudflare (làm 1 lần)

1. Vào **dash.cloudflare.com** → menu trái **Workers & Pages** → **Create application** → **Create Worker**.
2. Đặt tên ví dụ **`meofit-nutri-ai`** → **Deploy** (cứ deploy bản mặc định trước).
3. Bấm **Edit code** → xoá hết code mẫu → **dán toàn bộ** file [`nutri-ai-worker.js`](nutri-ai-worker.js) → **Deploy**.
4. Vào tab **Settings** của Worker → **Variables and Secrets** → **Add** một **Secret**:
   - Name: `GEMINI_KEY`
   - Value: API key Gemini free (lấy ở **aistudio.google.com** → *Get API key* — KHÔNG cần gắn thẻ/billing). Có thể dùng **cùng key với tarot** cũng được.
   - Bấm **Save / Deploy**.
5. Copy **URL của Worker** (dạng `https://meofit-nutri-ai.<tên>.workers.dev`) rồi **gửi cho Mèo (Claude)**.

## Sau khi có URL
Mèo sẽ cắm URL vào app (biến `NUTRI_PROXY_URL`) và build phần soi ảnh + ghi calo (Bước 2).

> Ghi chú: Worker đã chặn theo Origin (chỉ `fit.meomoe.com` & `localhost:5520` gọi được). Nếu sau này đổi domain, sửa mảng `ALLOW` trong file rồi Deploy lại.
