-- Users Table (With KYC & Wallet Columns)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    sms_wallet REAL DEFAULT 100.0,
    earning_wallet REAL DEFAULT 0.0,
    bonus_wallet REAL DEFAULT 100.0,
    role TEXT DEFAULT 'user',
    aadhaar_no TEXT DEFAULT '',
    pan_no TEXT DEFAULT '',
    bank_acc TEXT DEFAULT '',
    bank_ifsc TEXT DEFAULT '',
    bank_holder TEXT DEFAULT '',
    profile_pic TEXT DEFAULT ''
);

-- SMS Logs Table
CREATE TABLE IF NOT EXISTS sms_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    recipient_number TEXT,
    message_text TEXT,
    status TEXT DEFAULT 'Sent',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add Fund Requests Table
CREATE TABLE IF NOT EXISTS add_fund_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL,
    utr_number TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Withdrawals Table
CREATE TABLE IF NOT EXISTS withdrawals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL,
    payment_info TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
