export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      if (path === "/api/login" && method === "POST") {
        const { mobile, password } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").bind(mobile, password).first();
        if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        return new Response(JSON.stringify({ success: true, user }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (path === "/api/admin/requests" && method === "GET") {
        const funds = await env.DB.prepare("SELECT a.*, u.name, u.mobile FROM add_fund_requests a JOIN users u ON a.user_id = u.id ORDER BY a.id DESC").all();
        const withdrawals = await env.DB.prepare("SELECT w.*, u.name, u.mobile FROM withdrawals w JOIN users u ON w.user_id = u.id ORDER BY w.id DESC").all();
        return new Response(JSON.stringify({ success: true, funds: funds.results || [], withdrawals: withdrawals.results || [] }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (path === "/api/admin/action" && method === "POST") {
        const { type, id, action } = await request.json();
        if (type === 'fund') {
          const f = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE id = ?").bind(id).first();
          if (f && f.status === 'Pending' && action === 'Approved') {
            await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + ? WHERE id = ?").bind(f.amount, f.user_id).run();
          }
          await env.DB.prepare("UPDATE add_fund_requests SET status = ? WHERE id = ?").bind(action, id).run();
        } else if (type === 'withdrawal') {
          const w = await env.DB.prepare("SELECT * FROM withdrawals WHERE id = ?").bind(id).first();
          if (w && w.status === 'Pending' && action === 'Rejected') {
            await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet + ? WHERE id = ?").bind(w.amount, w.user_id).run();
          }
          await env.DB.prepare("UPDATE withdrawals SET status = ? WHERE id = ?").bind(action, id).run();
        }
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (path === "/api/admin/users" && method === "GET") {
        const users = await env.DB.prepare("SELECT * FROM users ORDER BY id DESC").all();
        return new Response(JSON.stringify({ success: true, users: users.results || [] }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (path === "/api/admin/user/update" && method === "POST") {
        const b = await request.json();
        await env.DB.prepare(`
          UPDATE users SET name = ?, mobile = ?, password = ?, role = ?, 
          sms_wallet = ?, earning_wallet = ?, bonus_wallet = ?, 
          pan_no = ?, bank_details = ? 
          WHERE id = ?
        `).bind(b.name, b.mobile, b.password, b.role, b.sms_wallet, b.earning_wallet, b.bonus_wallet, b.pan_no, b.bank_details, b.userId).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response("Not Found", { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
};
