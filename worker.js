const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BSNL Partner Admin Portal</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .light-card { background: #ffffff; border: 1px solid #fde68a; box-shadow: 0 8px 25px -5px rgba(245, 158, 11, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.04); }
        .hero-yellow { background: linear-gradient(135deg, #facc15 0%, #f59e0b 55%, #d97706 100%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-amber-50/60 min-h-screen text-slate-900 flex flex-col items-center justify-center p-0 sm:p-4">

    <!-- CUSTOM TOAST ALERT BANNER (NO BROWSER POPUP) -->
    <div id="app-toast" class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md pointer-events-none opacity-0 -translate-y-4 transition-all duration-300">
        <div id="app-toast-card" class="flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-xs font-bold">
            <div id="app-toast-icon" class="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 font-extrabold">✓</div>
            <p id="app-toast-msg" class="leading-snug flex-1">Notification message</p>
        </div>
    </div>

    <!-- MOBILE / RESPONSIVE ADMIN SHELL -->
    <div class="w-full max-w-lg bg-[#fffdf7] h-screen sm:h-[88vh] sm:max-h-[840px] sm:rounded-[2.2rem] shadow-[0_20px_60px_rgba(245,158,11,0.18)] flex flex-col relative overflow-hidden border border-amber-200">

        <!-- AMBIENT WARM GLOW -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 -left-24 w-64 h-64 bg-amber-200/25 rounded-full blur-3xl pointer-events-none"></div>

        <!-- ==================== ADMIN LOGIN SCREEN ==================== -->
        <div id="admin-login-screen" class="flex-1 flex flex-col justify-center p-6 space-y-6 my-auto relative z-10 overflow-y-auto no-scrollbar">
            <div class="text-center space-y-3">
                <div class="inline-flex p-3 bg-white rounded-2xl shadow-md border border-amber-200">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-12 object-contain">
                </div>
                <div>
                    <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-extrabold uppercase border border-amber-300">Command Console</span>
                    <h1 class="text-lg font-extrabold text-slate-900 tracking-tight mt-1.5">Admin Control Panel</h1>
                    <p class="text-xs text-slate-500 font-medium">Manage Users, KYC, Wallets, Deposits & Payouts</p>
                </div>
            </div>

            <div class="light-card rounded-3xl p-5 space-y-4">
                <form onsubmit="handleAdminLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Admin Mobile Number</label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-3 text-slate-500 text-xs font-mono font-bold">+91</span>
                            <input type="tel" id="adm-mobile" required placeholder="Admin mobile number" class="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Admin Password</label>
                        <input type="password" id="adm-password" required placeholder="••••••••" class="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all">Access Admin Dashboard →</button>
                </form>
            </div>
        </div>

        <!-- ==================== ADMIN MAIN DASHBOARD ==================== -->
        <div id="admin-dashboard" class="flex-1 flex flex-col hidden relative z-10 h-full overflow-hidden">

            <!-- LOCKED TOP HEADER -->
            <div class="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-amber-200 shrink-0 z-20 shadow-xs">
                <div class="flex items-center space-x-2.5">
                    <div class="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-extrabold text-sm">⚡</div>
                    <div>
                        <h2 id="adm-header-title" class="text-sm font-extrabold text-slate-900 tracking-tight">Admin Overview</h2>
                        <p class="text-[10px] text-amber-700 font-mono font-bold" id="adm-header-info">OPERATOR ACTIVE</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="refreshActiveTab()" class="p-2 bg-amber-100 hover:bg-amber-200 rounded-xl text-slate-900 text-xs font-extrabold active:scale-95 transition" title="Refresh">↻</button>
                    <button onclick="logoutAdmin()" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[10px] font-extrabold transition">Logout</button>
                    <div class="bg-white px-2 py-1 rounded-xl shadow-xs border border-amber-200">
                        <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-5 object-contain">
                    </div>
                </div>
            </div>

            <!-- SCROLLABLE CONTENT AREA -->
            <div class="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">

                <!-- STATS BANNER -->
                <div class="hero-yellow p-4 rounded-3xl shadow-md border border-yellow-300 grid grid-cols-3 gap-2 text-center">
                    <div class="bg-white/85 backdrop-blur-xs rounded-2xl p-2.5 border border-amber-200">
                        <p class="text-[9px] font-extrabold uppercase text-amber-900">Total Users</p>
                        <p id="stat-users-count" class="text-base font-extrabold text-slate-950 font-mono mt-0.5">0</p>
                    </div>
                    <div class="bg-white/85 backdrop-blur-xs rounded-2xl p-2.5 border border-amber-200">
                        <p class="text-[9px] font-extrabold uppercase text-amber-900">Deposits</p>
                        <p id="stat-dep-count" class="text-base font-extrabold text-slate-950 font-mono mt-0.5">0</p>
                    </div>
                    <div class="bg-white/85 backdrop-blur-xs rounded-2xl p-2.5 border border-amber-200">
                        <p class="text-[9px] font-extrabold uppercase text-amber-900">Withdrawals</p>
                        <p id="stat-wit-count" class="text-base font-extrabold text-slate-950 font-mono mt-0.5">0</p>
                    </div>
                </div>

                <!-- 1. USERS TAB -->
                <div id="adm-sec-users" class="space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">👥 Registered Users & KYC</h3>
                        <input type="text" id="user-search-input" oninput="renderUsersList()" placeholder="Search name / mobile..." class="px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-[11px] font-medium text-slate-900 focus:outline-none focus:border-amber-500 w-40">
                    </div>
                    <div id="adm-users-list" class="space-y-3">
                        <p class="text-center text-xs text-slate-400 py-8">Loading users...</p>
                    </div>
                </div>

                <!-- 2. DEPOSITS TAB -->
                <div id="adm-sec-deposits" class="space-y-3 hidden">
                    <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">💰 Deposit / UTR Requests</h3>
                    <div id="adm-deposits-list" class="space-y-3">
                        <p class="text-center text-xs text-slate-400 py-8">Loading deposits...</p>
                    </div>
                </div>

                <!-- 3. WITHDRAWALS TAB -->
                <div id="adm-sec-withdrawals" class="space-y-3 hidden">
                    <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">💸 Withdrawal Requests</h3>
                    <div id="adm-withdrawals-list" class="space-y-3">
                        <p class="text-center text-xs text-slate-400 py-8">Loading withdrawals...</p>
                    </div>
                </div>

                <!-- 4. SMS LOGS TAB -->
                <div id="adm-sec-sms" class="space-y-3 hidden">
                    <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">📨 SMS Broadcast Logs</h3>
                    <div id="adm-sms-list" class="space-y-3">
                        <p class="text-center text-xs text-slate-400 py-8">Loading SMS logs...</p>
                    </div>
                </div>

            </div>

            <!-- LOCKED BOTTOM NAVIGATION BAR -->
            <div class="bg-white/95 backdrop-blur-md border-t border-amber-200 px-1.5 py-2 flex justify-around items-center shrink-0 z-20">
                <button onclick="switchAdminTab('users')" id="adm-nav-users" class="flex flex-col items-center text-amber-800 text-[10px] font-extrabold space-y-1 px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-300">
                    <span class="text-base">👥</span><span>Users</span>
                </button>
                <button onclick="switchAdminTab('deposits')" id="adm-nav-deposits" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-2.5 py-1 rounded-xl">
                    <span class="text-base">💰</span><span>Deposits</span>
                </button>
                <button onclick="switchAdminTab('withdrawals')" id="adm-nav-withdrawals" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-2.5 py-1 rounded-xl">
                    <span class="text-base">💸</span><span>Withdraws</span>
                </button>
                <button onclick="switchAdminTab('sms')" id="adm-nav-sms" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-2.5 py-1 rounded-xl">
                    <span class="text-base">📨</span><span>SMS Logs</span>
                </button>
            </div>
        </div>
    </div>

    <!-- ==================== WALLET ADJUST MODAL ==================== -->
    <div id="wallet-adjust-modal" class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-amber-100 pb-3">
                <h3 class="font-extrabold text-sm text-amber-900">💳 Adjust User Wallet</h3>
                <button onclick="closeWalletModal()" class="text-slate-500 text-sm font-bold">✕</button>
            </div>
            <p id="wal-modal-user" class="text-xs font-bold text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200"></p>
            <form onsubmit="handleWalletAdjustSubmit(event)" class="space-y-3">
                <input type="hidden" id="wal-target-user-id">
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Select Wallet</label>
                    <select id="wal-type" class="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs font-bold text-slate-900">
                        <option value="sms_wallet">SMS Wallet (Campaign Balance)</option>
                        <option value="earning_wallet">Earning Wallet (Withdrawable)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Action Mode</label>
                    <select id="wal-mode" class="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs font-bold text-slate-900">
                        <option value="add">Add Amount (+)</option>
                        <option value="deduct">Deduct Amount (-)</option>
                        <option value="set">Set Exact Balance (=)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Amount (₹)</label>
                    <input type="number" step="0.01" id="wal-amount" required placeholder="0.00" class="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs font-mono font-bold text-slate-900">
                </div>
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md mt-1">Update Wallet Balance</button>
            </form>
        </div>
    </div>

    <script>
        let adminToken = null, activeTab = 'users', usersCache = [], toastTimer = null;

        function showAlert(message, type = 'info') {
            const toast = document.getElementById('app-toast');
            const card = document.getElementById('app-toast-card');
            const icon = document.getElementById('app-toast-icon');
            const text = document.getElementById('app-toast-msg');

            const styles = {
                success: {
                    card: 'bg-white border-emerald-400 text-emerald-950 shadow-emerald-500/15',
                    icon: 'bg-emerald-100 text-emerald-600 border border-emerald-300',
                    symbol: '✓'
                },
                error: {
                    card: 'bg-white border-rose-400 text-rose-950 shadow-rose-500/15',
                    icon: 'bg-rose-100 text-rose-600 border border-rose-300',
                    symbol: '✕'
                },
                warning: {
                    card: 'bg-white border-amber-400 text-amber-950 shadow-amber-500/20',
                    icon: 'bg-amber-100 text-amber-700 border border-amber-300',
                    symbol: '!'
                },
                info: {
                    card: 'bg-white border-yellow-400 text-slate-900 shadow-yellow-500/15',
                    icon: 'bg-yellow-100 text-amber-700 border border-yellow-300',
                    symbol: 'i'
                }
            };

            const cfg = styles[type] || styles.info;
            card.className = \`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-xs font-bold \${cfg.card}\`;
            icon.className = \`w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 font-extrabold \${cfg.icon}\`;
            icon.innerText = cfg.symbol;
            text.innerText = message;

            clearTimeout(toastTimer);
            toast.classList.remove('opacity-0', '-translate-y-4');
            toast.classList.add('opacity-100', 'translate-y-0');

            toastTimer = setTimeout(() => {
                toast.classList.remove('opacity-100', 'translate-y-0');
                toast.classList.add('opacity-0', '-translate-y-4');
            }, 3000);
        }

        async function handleAdminLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('adm-mobile').value;
            const password = document.getElementById('adm-password').value;
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, password })
            });
            const data = await res.json();
            if (res.ok) {
                adminToken = data.token || 'admin-ok';
                document.getElementById('adm-header-info').innerText = \`+91 \${mobile} • ADMIN\`;
                document.getElementById('admin-login-screen').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                showAlert('Admin console unlocked!', 'success');
                await loadAllAdminData();
            } else {
                showAlert(data.error || 'Invalid admin credentials.', 'error');
            }
        }

        function switchAdminTab(tab) {
            activeTab = tab;
            ['users', 'deposits', 'withdrawals', 'sms'].forEach(t => {
                document.getElementById('adm-sec-' + t).classList.add('hidden');
                const nav = document.getElementById('adm-nav-' + t);
                nav.className = t === tab
                    ? 'flex flex-col items-center text-amber-800 text-[10px] font-extrabold space-y-1 px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-300'
                    : 'flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-2.5 py-1 rounded-xl';
            });
            document.getElementById('adm-sec-' + tab).classList.remove('hidden');
            const titles = { users: 'Users & KYC', deposits: 'Deposit Requests', withdrawals: 'Withdrawals', sms: 'SMS Campaign Logs' };
            document.getElementById('adm-header-title').innerText = titles[tab];
            refreshActiveTab();
        }

        async function refreshActiveTab() {
            await loadAllAdminData();
        }

        async function loadAllAdminData() {
            try {
                const [uRes, dRes, wRes, sRes] = await Promise.all([
                    fetch('/api/admin/users'),
                    fetch('/api/admin/deposits'),
                    fetch('/api/admin/withdrawals'),
                    fetch('/api/admin/sms-logs')
                ]);
                const uData = await uRes.json();
                const dData = await dRes.json();
                const wData = await wRes.json();
                const sData = await sRes.json();

                usersCache = uData.users || [];
                const deposits = dData.deposits || [];
                const withdrawals = wData.withdrawals || [];
                const smsLogs = sData.logs || [];

                document.getElementById('stat-users-count').innerText = usersCache.length;
                document.getElementById('stat-dep-count').innerText = deposits.length;
                document.getElementById('stat-wit-count').innerText = withdrawals.length;

                renderUsersList();
                renderDepositsList(deposits);
                renderWithdrawalsList(withdrawals);
                renderSmsLogsList(smsLogs);
            } catch (err) {
                showAlert('Error syncing admin records.', 'error');
            }
        }

        function badgeHtml(status) {
            const s = (status || '').toLowerCase();
            if (s === 'verified' || s === 'approved' || s === 'sent') {
                return '<span class="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">' + status + '</span>';
            }
            if (s === 'rejected' || s === 'failed') {
                return '<span class="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">' + status + '</span>';
            }
            return '<span class="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">' + (status || 'Pending') + '</span>';
        }

        function renderUsersList() {
            const q = (document.getElementById('user-search-input')?.value || '').toLowerCase().trim();
            const filtered = usersCache.filter(u =>
                (u.name || '').toLowerCase().includes(q) ||
                (u.mobile || '').toLowerCase().includes(q)
            );
            const container = document.getElementById('adm-users-list');
            container.innerHTML = filtered.map(u => \`
                <div class="light-card p-4 rounded-2xl text-xs space-y-2.5">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-extrabold text-slate-900 text-sm">\${u.name || 'User'} <span class="text-[10px] font-mono text-slate-500">#\${u.id}</span></p>
                            <p class="font-mono text-[11px] text-amber-800 font-bold">+91 \${u.mobile}</p>
                        </div>
                        \${badgeHtml(u.kyc_status || 'Pending')}
                    </div>

                    <div class="grid grid-cols-2 gap-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 font-mono">
                        <div>
                            <span class="text-[9px] uppercase text-slate-500 block font-sans font-bold">SMS Wallet</span>
                            <span class="font-extrabold text-slate-950">₹\${parseFloat(u.sms_wallet || 0).toFixed(2)}</span>
                        </div>
                        <div>
                            <span class="text-[9px] uppercase text-slate-500 block font-sans font-bold">Earning Wallet</span>
                            <span class="font-extrabold text-slate-950">₹\${parseFloat(u.earning_wallet || 0).toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="text-[10px] text-slate-600 space-y-0.5 bg-amber-50/40 p-2 rounded-xl border border-amber-100 font-mono">
                        <p><strong class="font-sans text-slate-800">PAN:</strong> \${u.pan_no || 'N/A'}</p>
                        <p><strong class="font-sans text-slate-800">Bank:</strong> \${u.acc_holder_name || 'N/A'} • A/C: \${u.bank_acc_no || 'N/A'} • IFSC: \${u.bank_ifsc || 'N/A'}</p>
                    </div>

                    <div class="flex gap-2 pt-1">
                        <button onclick="openWalletModal(\${u.id}, '\${(u.name || 'User').replace(/'/g, '')}', '\${u.mobile}')" class="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-[11px] shadow-2xs active:scale-95 transition">💳 Edit Wallet</button>
                        \${(u.kyc_status !== 'Verified') ? \`<button onclick="verifyUserKyc(\${u.id})" class="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-extrabold rounded-xl text-[11px] active:scale-95 transition">✓ Verify KYC</button>\` : ''}
                    </div>
                </div>
            \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No matching users found.</p>';
        }

        function openWalletModal(userId, name, mobile) {
            document.getElementById('wal-target-user-id').value = userId;
            document.getElementById('wal-modal-user').innerText = \`User: \${name} (+91 \${mobile})\`;
            document.getElementById('wal-amount').value = '';
            document.getElementById('wallet-adjust-modal').classList.remove('hidden');
        }

        function closeWalletModal() {
            document.getElementById('wallet-adjust-modal').classList.add('hidden');
        }

        async function handleWalletAdjustSubmit(e) {
            e.preventDefault();
            const payload = {
                userId: parseInt(document.getElementById('wal-target-user-id').value),
                walletType: document.getElementById('wal-type').value,
                mode: document.getElementById('wal-mode').value,
                amount: parseFloat(document.getElementById('wal-amount').value)
            };
            const res = await fetch('/api/admin/wallet-adjust', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                closeWalletModal();
                showAlert('User wallet updated successfully.', 'success');
                await loadAllAdminData();
            } else {
                showAlert(data.error || 'Failed to update wallet.', 'error');
            }
        }

        async function verifyUserKyc(userId) {
            const res = await fetch('/api/admin/kyc-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            if (res.ok) {
                showAlert('User KYC marked as Verified.', 'success');
                await loadAllAdminData();
            } else {
                showAlert('Could not verify KYC.', 'error');
            }
        }

        function renderDepositsList(deposits) {
            const container = document.getElementById('adm-deposits-list');
            container.innerHTML = deposits.map(d => \`
                <div class="light-card p-4 rounded-2xl text-xs space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-extrabold text-slate-950 font-mono text-sm">₹\${parseFloat(d.amount || 0).toFixed(2)}</span>
                        \${badgeHtml(d.status)}
                    </div>
                    <div class="text-[11px] text-slate-600 font-mono space-y-0.5">
                        <p><strong class="font-sans text-slate-800">User ID:</strong> #\${d.user_id} (\${d.user_name || 'User'})</p>
                        <p><strong class="font-sans text-slate-800">UTR:</strong> \${d.utr_number}</p>
                    </div>
                    \${d.status === 'Pending' ? \`
                        <div class="flex gap-2 pt-1">
                            <button onclick="updateDepositStatus(\${d.id}, 'Approved')" class="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-[11px] transition">Approve & Credit</button>
                            <button onclick="updateDepositStatus(\${d.id}, 'Rejected')" class="flex-1 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 font-extrabold rounded-xl text-[11px] transition">Reject</button>
                        </div>
                    \` : ''}
                </div>
            \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No deposit requests found.</p>';
        }

        async function updateDepositStatus(id, status) {
            const res = await fetch('/api/admin/deposit-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            const data = await res.json();
            if (res.ok) {
                showAlert(\`Deposit \${status.toLowerCase()} successfully.\`, status === 'Approved' ? 'success' : 'warning');
                await loadAllAdminData();
            } else {
                showAlert(data.error || 'Action failed.', 'error');
            }
        }

        function renderWithdrawalsList(withdrawals) {
            const container = document.getElementById('adm-withdrawals-list');
            container.innerHTML = withdrawals.map(w => \`
                <div class="light-card p-4 rounded-2xl text-xs space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-extrabold text-slate-950 font-mono text-sm">₹\${parseFloat(w.amount || 0).toFixed(2)}</span>
                        \${badgeHtml(w.status)}
                    </div>
                    <div class="text-[11px] text-slate-600 font-mono space-y-0.5">
                        <p><strong class="font-sans text-slate-800">User ID:</strong> #\${w.user_id} (\${w.user_name || 'User'})</p>
                        <p class="break-all"><strong class="font-sans text-slate-800">Bank:</strong> \${w.payment_info || 'N/A'}</p>
                    </div>
                    \${w.status === 'Pending' ? \`
                        <div class="flex gap-2 pt-1">
                            <button onclick="updateWithdrawalStatus(\${w.id}, 'Approved')" class="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-[11px] transition">Approve Payout</button>
                            <button onclick="updateWithdrawalStatus(\${w.id}, 'Rejected')" class="flex-1 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 font-extrabold rounded-xl text-[11px] transition">Reject & Refund</button>
                        </div>
                    \` : ''}
                </div>
            \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No withdrawal requests found.</p>';
        }

        async function updateWithdrawalStatus(id, status) {
            const res = await fetch('/api/admin/withdrawal-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            const data = await res.json();
            if (res.ok) {
                showAlert(\`Withdrawal \${status.toLowerCase()} successfully.\`, status === 'Approved' ? 'success' : 'warning');
                await loadAllAdminData();
            } else {
                showAlert(data.error || 'Action failed.', 'error');
            }
        }

        function renderSmsLogsList(logs) {
            const container = document.getElementById('adm-sms-list');
            container.innerHTML = logs.map(l => \`
                <div class="light-card p-3.5 rounded-2xl text-xs flex justify-between items-center">
                    <div class="space-y-1">
                        <p class="font-extrabold text-slate-900 font-mono">User #\${l.user_id} • -₹\${parseFloat(l.cost || 0.5).toFixed(2)}</p>
                        <p class="text-[10px] text-slate-500 font-mono">🕒 \${l.created_at || 'Recorded'}</p>
                    </div>
                    \${badgeHtml(l.status || 'Sent')}
                </div>
            \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No SMS logs available.</p>';
        }

        function logoutAdmin() {
            location.reload();
        }
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      if (path === "/api/admin/login" && method === "POST") {
        const { mobile, password } = await request.json();
        const admin = await env.DB.prepare(
          "SELECT * FROM users WHERE mobile = ? AND password = ? AND role = 'admin'"
        ).bind(mobile, password).first();

        if (!admin) {
          return new Response(JSON.stringify({ error: "Invalid admin mobile or password" }), {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ success: true, token: "session-active" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/users" && method === "GET") {
        const res = await env.DB.prepare(
          "SELECT id, name, mobile, role, sms_wallet, earning_wallet, pan_no, aadhaar_no, acc_holder_name, bank_acc_no, bank_ifsc, kyc_status FROM users WHERE role != 'admin' ORDER BY id DESC"
        ).all();
        return new Response(JSON.stringify({ success: true, users: res.results || [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/wallet-adjust" && method === "POST") {
        const { userId, walletType, mode, amount } = await request.json();
        const allowedWallets = ["sms_wallet", "earning_wallet"];
        if (!allowedWallets.includes(walletType) || isNaN(amount) || amount < 0) {
          return new Response(JSON.stringify({ error: "Invalid wallet parameters" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const user = await env.DB.prepare(`SELECT ${walletType} AS bal FROM users WHERE id = ?`).bind(userId).first();
        if (!user) {
          return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const currentBal = parseFloat(user.bal) || 0;
        let nextBal = currentBal;
        if (mode === "add") nextBal = currentBal + parseFloat(amount);
        else if (mode === "deduct") nextBal = Math.max(0, currentBal - parseFloat(amount));
        else if (mode === "set") nextBal = parseFloat(amount);

        await env.DB.prepare(`UPDATE users SET ${walletType} = ? WHERE id = ?`).bind(nextBal, userId).run();
        return new Response(JSON.stringify({ success: true, balance: nextBal }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/kyc-verify" && method === "POST") {
        const { userId } = await request.json();
        await env.DB.prepare("UPDATE users SET kyc_status = 'Verified' WHERE id = ?").bind(userId).run();
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/deposits" && method === "GET") {
        const res = await env.DB.prepare(`
          SELECT r.*, u.name AS user_name, u.mobile AS user_mobile
          FROM add_fund_requests r
          LEFT JOIN users u ON r.user_id = u.id
          ORDER BY r.id DESC
        `).all();
        return new Response(JSON.stringify({ success: true, deposits: res.results || [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/deposit-action" && method === "POST") {
        const { id, status } = await request.json();
        const reqRow = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE id = ?").bind(id).first();
        if (!reqRow) {
          return new Response(JSON.stringify({ error: "Deposit request not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        if (reqRow.status !== "Pending") {
          return new Response(JSON.stringify({ error: "Request already processed" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        await env.DB.prepare("UPDATE add_fund_requests SET status = ? WHERE id = ?").bind(status, id).run();
        if (status === "Approved") {
          await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + ? WHERE id = ?")
            .bind(parseFloat(reqRow.amount) || 0, reqRow.user_id).run();
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/withdrawals" && method === "GET") {
        const res = await env.DB.prepare(`
          SELECT w.*, u.name AS user_name, u.mobile AS user_mobile
          FROM withdrawals w
          LEFT JOIN users u ON w.user_id = u.id
          ORDER BY w.id DESC
        `).all();
        return new Response(JSON.stringify({ success: true, withdrawals: res.results || [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/withdrawal-action" && method === "POST") {
        const { id, status } = await request.json();
        const witRow = await env.DB.prepare("SELECT * FROM withdrawals WHERE id = ?").bind(id).first();
        if (!witRow) {
          return new Response(JSON.stringify({ error: "Withdrawal request not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        if (witRow.status !== "Pending") {
          return new Response(JSON.stringify({ error: "Withdrawal already processed" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        await env.DB.prepare("UPDATE withdrawals SET status = ? WHERE id = ?").bind(status, id).run();
        if (status === "Rejected") {
          await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet + ? WHERE id = ?")
            .bind(parseFloat(witRow.amount) || 0, witRow.user_id).run();
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (path === "/api/admin/sms-logs" && method === "GET") {
        const res = await env.DB.prepare("SELECT id, user_id, cost, status, created_at FROM sms_logs ORDER BY id DESC").all();
        return new Response(JSON.stringify({ success: true, logs: res.results || [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(ADMIN_HTML, {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "text/html" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};
