// ============================================================
// MèoFit · Mèo Dinh Dưỡng AI — Cloudflare Worker cầu nối Gemini (đọc ảnh)
// Giữ GEMINI_KEY bí mật; chặn theo Origin để không bị xài chùa.
// Dán toàn bộ file này vào Worker trên dash.cloudflare.com rồi Deploy.
// Nhớ thêm Secret tên GEMINI_KEY (key free từ aistudio.google.com).
// ============================================================

// Các trang được phép gọi (thêm domain thật của cưng vào đây)
const ALLOW = [
  'https://fit.meomoe.com',
  'https://www.fit.meomoe.com',
  'http://localhost:5520',
  'http://127.0.0.1:5520'
];

// Thử lần lượt các model free (giống proxy tarot); model nào chạy thì dùng
const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash'];

const PROMPT = `Bạn là chuyên gia dinh dưỡng. Ảnh có thể là (A) MỘT phần ăn thật, hoặc (B) NHÃN DINH DƯỠNG của sản phẩm đóng gói.
- Nếu là phần ăn: ước lượng cho MỘT khẩu phần thấy trong ảnh.
- Nếu là nhãn dinh dưỡng: đọc "khẩu phần / serving size" trên nhãn và tính giá trị cho MỘT khẩu phần (một lần dùng). Nếu nhãn chỉ ghi theo 100g mà có ghi khối lượng khẩu phần thì quy về một khẩu phần đó.
CHỈ trả về JSON thu gọn (không markdown), đúng schema:
{"ok":true,"type":"meal"|"label","dish":"tên món/sản phẩm tiếng Việt ngắn gọn","serving":"mô tả 1 khẩu phần (vd: 1 gói 30g)","items":[{"name":"","kcal":0,"p":0,"c":0,"f":0}],"kcal":0,"p":0,"c":0,"f":0,"confidence":"cao|vừa|thấp","note":"1 câu ngắn tiếng Việt"}
p=đạm(gam), c=carb(gam), f=chất béo(gam), tất cả SỐ NGUYÊN. kcal/p/c/f là cho MỘT khẩu phần/phần ăn. Với nhãn thì "items" có thể để rỗng []; với phần ăn thì "items" liệt kê từng món.
Nếu ảnh KHÔNG phải đồ ăn hay nhãn dinh dưỡng: {"ok":false,"reason":"1 câu ngắn tiếng Việt"}.`;

function corsHeaders(origin) {
  const allowed = ALLOW.includes(origin) ? origin : ALLOW[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (req.method === 'OPTIONS') return new Response(null, { headers });
    if (req.method !== 'POST')
      return new Response(JSON.stringify({ ok: false, reason: 'POST only' }), { status: 405, headers });
    if (!ALLOW.includes(origin))
      return new Response(JSON.stringify({ ok: false, reason: 'origin not allowed' }), { status: 403, headers });

    let body;
    try { body = await req.json(); }
    catch (e) { return new Response(JSON.stringify({ ok: false, reason: 'bad json' }), { status: 400, headers }); }

    const data = (body.image || '').replace(/^data:[^,]+,/, ''); // bỏ tiền tố "data:image/...;base64,"
    const mime = body.mime || 'image/jpeg';
    if (!data) return new Response(JSON.stringify({ ok: false, reason: 'no image' }), { status: 400, headers });

    const payload = {
      contents: [{ parts: [{ text: PROMPT }, { inline_data: { mime_type: mime, data } }] }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
    };

    let lastErr = '';
    for (const model of MODELS) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_KEY}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        const j = await r.json();
        if (!r.ok) { lastErr = (j.error && j.error.message) || ('HTTP ' + r.status); continue; }
        const txt = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (txt) return new Response(txt, { headers }); // txt đã là JSON (nhờ responseMimeType)
        lastErr = 'empty response';
      } catch (e) { lastErr = e.message; }
    }
    return new Response(JSON.stringify({ ok: false, reason: 'Mèo hơi đói pin, thử lại sau nha 🐾', detail: lastErr }), { status: 502, headers });
  }
};
