const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Master Control Panel</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 flex flex-col items-center p-2 sm:p-4">
    <div id="admin-login-box" class="bg-white border border-emerald-100 w-full max-w-sm rounded-2xl p-6 shadow-xl my-auto">
        <div class="text-center mb-5">
            <h2 class="text-xl font-bold text-emerald-700">🔐 Master Admin Portal</h2>
            <p class="text-xs text-gray-500 mt-1">Authorized Personnel Only</p>
        </div>
        <form onsubmit="handleAdminLogin(event)" class="space-y-4">
            <div>
                <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Admin Mobile</label>
                <input type="tel" id="admin-mobile" required placeholder="Enter admin mobile" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
                <input type="password" id="admin-password" required placeholder="Enter password" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md">Login to Admin Panel</button>
        </form>
    </div>

    <div id="admin-dashboard" class="bg-white border border-gray-200 w-full max-w-3xl rounded-2xl shadow-xl hidden flex flex-col min-h-[85vh] overflow-hidden">
        <div class="bg-emerald-700 text-white px-4 py-3.5 flex items-center justify-between">
            <div>
                <h2 class="text-base font-bold">🛡️ Master Admin Control</h2>
                <p class="text-[11px] text-emerald-100">Payments, Withdrawals & Full User Control</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="refreshAllAdminData()" class="bg-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold">🔄 Refresh</button>
                <button onclick="adminLogout()" class="bg-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Logout</button>
            </div>
        </div>

        <div class="p-3 bg-gray-50 border-b">
            <div class="grid grid-cols-3 bg-emerald-100/80 p-1 rounded-xl text-xs font-bold gap-1">
                <button onclick="switchAdminTab('deposits')" id="tab-btn-deposits" class="py-2.5 bg-emerald-600 text-white rounded-lg shadow-xs">💰 New Deposits <span id="badge-deposits" class="ml-1 bg-white text-emerald-700 px-1.5 rounded-full text-[10px]">0</span></button>
                <button onclick="switchAdminTab('withdrawals')" id="tab-btn-withdrawals" class="py-2.5 text-emerald-800 rounded-lg">💸 Withdrawals <span id="badge-withdrawals" class="ml-1 bg-emerald-200 text-emerald-900 px-1.5 rounded-full text-[10px]">0</span></button>
                <button onclick="switchAdminTab('users')" id="tab-btn-users" class="py-2.5 text-emerald-800 rounded-lg">👥 All Users <span id="badge-users" class="ml-1 bg-emerald-200 text-emerald-900 px-1.5 rounded-full text-[10px]">0</span></button>
            </div>
        </div>

        <div id="sec-deposits" class="p-4 flex-1 overflow-y-auto space-y-3"><p class="text-xs text-gray-400 text-center py-8">Loading deposits...</p></div>
        <div id="sec-withdrawals" class="p-4 flex-1 overflow-y-auto space-y-3 hidden"><p class="text-xs text-gray-400 text-center py-8">Loading withdrawals...</p></div>
        <div id="sec-users" class="p-4 flex-1 overflow-y-auto space-y-3 hidden">
            <input type="text" id="user-search-input" onkeyup="filterUsersList()" placeholder="🔍 Search user by Name or Mobile..." class="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs">
            <div id="users-list-container" class="space-y-2.5"></div>
        </div>
    </div>

    <!-- USER EDIT MODAL -->
    <div id="user-detail-modal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-2 sm:p-4">
        <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            <div class="bg-emerald-700 text-white px-4 py-3 flex items-center justify-between">
                <h3 id="modal-user-title" class="font-bold text-sm">User Full Control</h3>
                <button onclick="closeUserModal()" class="bg-emerald-800 px-2.5 py-1 rounded-lg text-xs font-bold">✕ Close</button>
            </div>
            <div class="p-4 overflow-y-auto flex-1 space-y-3">
                <input type="hidden" id="edit-user-id">
                <div class="grid grid-cols-2 gap-3">
                    <div><label class="text-[11px] font-bold text-gray-500 uppercase">Name</label><input type="text" id="edit-name" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"></div>
                    <div><label class="text-[11px] font-bold text-gray-500 uppercase">Mobile</label><input type="text" id="edit-mobile" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono"></div>
                    <div><label class="text-[11px] font-bold text-gray-500 uppercase">Password</label><input type="text" id="edit-password" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono"></div>
                    <div><label class="text-[11px] font-bold text-gray-500 uppercase">Role</label><select id="edit-role" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"><option value="user">User</option><option value="admin">Admin</option></select></div>
                </div>
                <div class="border-t pt-2">
                    <h4 class="text-xs font-bold text-emerald-700 mb-2">💳 Wallets</h4>
                    <div class="grid grid-cols-3 gap-2">
                        <div><label class="text-[10px] font-bold text-emerald-800">SMS Wallet</label><input type="number" step="0.01" id="edit-sms-wallet" class="w-full px-2 py-1.5 border rounded-lg text-xs"></div>
                        <div><label class="text-[10px] font-bold text-teal-800">Earning Wallet</label><input type="number" step="0.01" id="edit-earning-wallet" class="w-full px-2 py-1.5 border rounded-lg text-xs"></div>
                        <div><label class="text-[10px] font-bold text-amber-800">Bonus Wallet</label><input type="number" step="0.01" id="edit-bonus-wallet" class="w-full px-2 py-1.5 border rounded-lg text-xs"></div>
                    </div>
                </div>
                <div class="border-t pt-2 space-y-2">
                    <h4 class="text-xs font-bold text-emerald-700">🪪 KYC & Bank</h4>
                    <input type="text" id="edit-aadhaar" placeholder="Aadhaar No" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                    <input type="text" id="edit-pan" placeholder="PAN No" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                    <input type="text" id="edit-bank-acc" placeholder="Account No" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                    <input type="text" id="edit-bank-ifsc" placeholder="IFSC" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                    <input type="text" id="edit-bank-holder" placeholder="Holder Name" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                </div>
            </div>
            <div class="p-3 bg-gray-50 border-t">
                <button onclick="saveUserChangesByAdmin()" class="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md">💾 Save All Changes</button>
            </div>
        </div>
    </div>

    <script>
        let allUsersCache = [];
        async function handleAdminLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('admin-mobile').value, password = document.getElementById('admin-password').value;
            const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, password }) });
            const data = await res.json();
            if (res.ok && data.user.role === 'admin') {
                document.getElementById('admin-login-box').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                refreshAllAdminData();
            } else { alert('Access Denied: Invalid admin credentials.'); }
        }
        function switchAdminTab(tab) {
            ['deposits', 'withdrawals', 'users'].forEach(t => {
                document.getElementById('sec-' + t).classList.add('hidden');
                document.getElementById('tab-btn-' + t).className = 'py-2.5 text-emerald-800 rounded-lg';
            });
            document.getElementById('sec-' + tab).classList.remove('hidden');
            document.getElementById('tab-btn-' + tab).className = 'py-2.5 bg-emerald-600 text-white rounded-lg shadow-xs';
        }
        async function refreshAllAdminData() { await Promise.all([loadRequestsData(), loadAllUsers()]); }
        async function loadRequestsData() {
            const res = await fetch('/api/admin/requests');
            const data = await res.json();
            if (!res.ok) return;
            document.getElementById('badge-deposits').innerText = data.funds.filter(f => f.status === 'Pending').length;
            document.getElementById('badge-withdrawals').innerText = data.withdrawals.filter(w => w.status === 'Pending').length;

            document.getElementById('sec-deposits').innerHTML = data.funds.map(f => \`
                <div class="bg-gray-50 border p-3.5 rounded-xl text-xs space-y-2">
                    <div class="flex justify-between font-bold"><span>👤 \${f.name} (\${f.mobile})</span><span class="text-emerald-700 text-sm">₹\${f.amount}</span></div>
                    <div class="flex justify-between text-[11px] text-gray-500 font-mono"><span>UTR: <b>\${f.utr_number}</b></span><span>\${f.status}</span></div>
                    \${f.status === 'Pending' ? \`<div class="flex gap-2"><button onclick="adminAction('fund', \${f.id}, 'Approved')" class="w-1/2 py-2 bg-emerald-600 text-white rounded-lg font-bold">✓ Approve</button><button onclick="adminAction('fund', \${f.id}, 'Rejected')" class="w-1/2 py-2 bg-red-600 text-white rounded-lg font-bold">✕ Reject</button></div>\` : ''}
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-8">No deposits found.</p>';

            document.getElementById('sec-withdrawals').innerHTML = data.withdrawals.map(w => \`
                <div class="bg-gray-50 border p-3.5 rounded-xl text-xs space-y-2">
                    <div class="flex justify-between font-bold"><span>👤 \${w.name} (\${w.mobile})</span><span class="text-teal-700 text-sm">₹\${w.amount}</span></div>
                    <p class="text-[11px] bg-white p-2 rounded border font-mono">Bank: <b>\${w.payment_info}</b></p>
                    \${w.status === 'Pending' ? \`<div class="flex gap-2"><button onclick="adminAction('withdrawal', \${w.id}, 'Approved')" class="w-1/2 py-2 bg-emerald-600 text-white rounded-lg font-bold">✓ Approve</button><button onclick="adminAction('withdrawal', \${w.id}, 'Rejected')" class="w-1/2 py-2 bg-red-600 text-white rounded-lg font-bold">✕ Reject & Refund</button></div>\` : ''}
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-8">No withdrawals found.</p>';
        }
        async function adminAction(type, id, action) {
            await fetch('/api/admin/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, id, action }) });
            refreshAllAdminData();
        }
        async function loadAllUsers() {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (!res.ok) return;
            allUsersCache = data.users || [];
            document.getElementById('badge-users').innerText = allUsersCache.length;
            renderUsersList(allUsersCache);
        }
        function renderUsersList(users) {
            document.getElementById('users-list-container').innerHTML = users.map(u => \`
                <div onclick="openUserModal(\${u.id})" class="bg-gray-50 hover:bg-emerald-50 border p-3 rounded-xl cursor-pointer flex justify-between items-center">
                    <div>
                        <div class="font-bold text-xs">\${u.name} <span class="text-[10px] px-2 py-0.5 rounded bg-gray-200">\${u.role}</span></div>
                        <div class="text-[11px] text-gray-500 font-mono">📱 \${u.mobile}</div>
                    </div>
                    <span class="text-xs font-bold text-emerald-700">Manage →</span>
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-6">No users found.</p>';
        }
        function filterUsersList() {
            const q = document.getElementById('user-search-input').value.toLowerCase();
            renderUsersList(allUsersCache.filter(u => u.name.toLowerCase().includes(q) || u.mobile.includes(q)));
        }
        function openUserModal(id) {
            const u = allUsersCache.find(x => x.id === id);
            if (!u) return;
            document.getElementById('edit-user-id').value = u.id;
            document.getElementById('modal-user-title').innerText = \`Manage: \${u.name}\`;
            document.getElementById('edit-name').value = u.name;
            document.getElementById('edit-mobile').value = u.mobile;
            document.getElementById('edit-password').value = u.password;
            document.getElementById('edit-role').value = u.role;
            document.getElementById('edit-sms-wallet').value = u.sms_wallet;
            document.getElementById('edit-earning-wallet').value = u.earning_wallet;
            document.getElementById('edit-bonus-wallet').value = u.bonus_wallet;
            document.getElementById('edit-aadhaar').value = u.aadhaar_no || '';
            document.getElementById('edit-pan').value = u.pan_no || '';
            document.getElementById('edit-bank-acc').value = u.bank_acc || '';
            document.getElementById('edit-bank-ifsc').value = u.bank_ifsc || '';
            document.getElementById('edit-bank-holder').value = u.bank_holder || '';
            document.getElementById('user-detail-modal').classList.remove('hidden');
        }
        function closeUserModal() { document.getElementById('user-detail-modal').classList.add('hidden'); }
        async function saveUserChangesByAdmin() {
            const payload = {
                userId: parseInt(document.getElementById('edit-user-id').value),
                name: document.getElementById('edit-name').value,
                mobile: document.getElementById('edit-mobile').value,
                password: document.getElementById('edit-password').value,
                role: document.getElementById('edit-role').value,
                sms_wallet: parseFloat(document.getElementById('edit-sms-wallet').value) || 0,
                earning_wallet: parseFloat(document.getElementById('edit-earning-wallet').value) || 0,
                bonus_wallet: parseFloat(document.getElementById('edit-bonus-wallet').value) || 0,
                aadhaar_no: document.getElementById('edit-aadhaar').value,
                pan_no: document.getElementById('edit-pan').value,
                bank_acc: document.getElementById('edit-bank-acc').value,
                bank_ifsc: document.getElementById('edit-bank-ifsc').value,
                bank_holder: document.getElementById('edit-bank-holder').value
            };
            const res = await fetch('/api/admin/user/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (res.ok) { alert('Updated successfully!'); closeUserModal(); refreshAllAdminData(); }
            else { alert('Error updating'); }
        }
        function adminLogout() { location.reload(); }
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      if (path === "/" || path === "/admin.html") {
        return new Response(ADMIN_HTML, { status: 200, headers: { "Content-Type": "text/html" } });
      }
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
          aadhaar_no = ?, pan_no = ?, bank_acc = ?, bank_ifsc = ?, bank_holder = ? 
          WHERE id = ?
        `).bind(b.name, b.mobile, b.password, b.role, b.sms_wallet, b.earning_wallet, b.bonus_wallet, b.aadhaar_no, b.pan_no, b.bank_acc, b.bank_ifsc, b.bank_holder, b.userId).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response("Not Found", { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
};
