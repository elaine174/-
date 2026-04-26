'use strict';
const express = require('express');
const multer = require('multer');
const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zoo2024';
const JUDGE_PASSWORD = process.env.JUDGE_PASSWORD || 'judge2024';

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const db = new Database('contest.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY,
    display_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    filename TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS awards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    judge_name TEXT NOT NULL,
    winner_photo_id TEXT,
    display_order INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

const _get = db.prepare('SELECT value FROM settings WHERE key = ?');
const _set = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
const getSetting = (k) => _get.get(k)?.value ?? 'false';
const setSetting = (k, v) => _set.run(k, String(v));

if (!_get.get('revealed')) setSetting('revealed', 'false');

if (db.prepare('SELECT COUNT(*) as c FROM awards').get().c === 0) {
  const ins = db.prepare('INSERT INTO awards (id, name, judge_name, display_order) VALUES (?, ?, ?, ?)');
  ins.run(uuidv4(), '最佳厭世獎', '柏翰輔導會長', 0);
  ins.run(uuidv4(), '最像人類獎', '育誠會長', 1);
}

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${uuidv4().slice(0,8)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('請上傳圖片檔案'));
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/api/status', (req, res) => {
  res.json({
    revealed: getSetting('revealed') === 'true',
    photo_count: db.prepare('SELECT COUNT(*) as c FROM photos').get().c,
  });
});

app.post('/api/submit', upload.single('photo'), (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    if (!name) return res.status(400).json({ error: '請填寫您的姓名' });
    if (!req.file) return res.status(400).json({ error: '請上傳一張照片' });
    const display_id = db.prepare('SELECT COUNT(*) as c FROM photos').get().c + 1;
    db.prepare('INSERT INTO photos (id, display_id, name, filename) VALUES (?, ?, ?, ?)')
      .run(uuidv4(), display_id, name, req.file.filename);
    res.json({ success: true, display_id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/photos', (req, res) => {
  const photos = db.prepare('SELECT id, display_id, filename FROM photos ORDER BY display_id').all();
  res.json({ photos });
});

app.get('/api/awards', (req, res) => {
  const revealed = getSetting('revealed') === 'true';
  const awards = db.prepare(`
    SELECT a.id, a.name, a.judge_name, a.winner_photo_id,
           p.filename as winner_filename, p.display_id as winner_display_id
           ${revealed ? ', p.name as winner_name' : ''}
    FROM awards a
    LEFT JOIN photos p ON p.id = a.winner_photo_id
    ORDER BY a.display_order, a.rowid
  `).all();
  res.json({ awards, revealed });
});

app.get('/api/judge/awards', (req, res) => {
  if (req.query.password !== JUDGE_PASSWORD) return res.status(401).json({ error: '評審密碼錯誤' });
  const awards = db.prepare(`
    SELECT a.id, a.name, a.judge_name, a.winner_photo_id, p.display_id as winner_display_id
    FROM awards a LEFT JOIN photos p ON p.id = a.winner_photo_id
    ORDER BY a.display_order, a.rowid
  `).all();
  res.json({ awards });
});

app.post('/api/judge/pick', (req, res) => {
  const { award_id, photo_id, password } = req.body;
  if (password !== JUDGE_PASSWORD) return res.status(401).json({ error: '評審密碼錯誤' });
  if (!db.prepare('SELECT 1 FROM awards WHERE id = ?').get(award_id))
    return res.status(400).json({ error: '找不到此獎項' });
  if (!db.prepare('SELECT 1 FROM photos WHERE id = ?').get(photo_id))
    return res.status(400).json({ error: '找不到此照片' });
  db.prepare('UPDATE awards SET winner_photo_id = ? WHERE id = ?').run(photo_id, award_id);
  res.json({ success: true });
});

function adminOnly(req, res) {
  const pw = req.body?.password ?? req.query?.password;
  if (pw !== ADMIN_PASSWORD) { res.status(401).json({ error: '密碼錯誤' }); return false; }
  return true;
}

app.post('/api/admin/reveal', (req, res) => {
  if (!adminOnly(req, res)) return;
  setSetting('revealed', 'true');
  res.json({ success: true });
});

app.post('/api/admin/hide', (req, res) => {
  if (!adminOnly(req, res)) return;
  setSetting('revealed', 'false');
  res.json({ success: true });
});

app.post('/api/admin/award/add', (req, res) => {
  if (!adminOnly(req, res)) return;
  const { name, judge_name } = req.body;
  if (!name || !judge_name) return res.status(400).json({ error: '請填寫獎項和評審名稱' });
  const count = db.prepare('SELECT COUNT(*) as c FROM awards').get().c;
  db.prepare('INSERT INTO awards (id, name, judge_name, display_order) VALUES (?, ?, ?, ?)')
    .run(uuidv4(), name.trim(), judge_name.trim(), count);
  res.json({ success: true });
});

app.post('/api/admin/award/delete', (req, res) => {
  if (!adminOnly(req, res)) return;
  db.prepare('DELETE FROM awards WHERE id = ?').run(req.body.award_id);
  res.json({ success: true });
});

app.get('/api/admin/submissions', (req, res) => {
  if (!adminOnly(req, res)) return;
  res.json({
    photos: db.prepare('SELECT id, display_id, name, filename, created_at FROM photos ORDER BY display_id').all()
  });
});

app.post('/api/admin/reset', (req, res) => {
  if (!adminOnly(req, res)) return;
  db.exec('DELETE FROM photos;');
  db.prepare('UPDATE awards SET winner_photo_id = NULL').run();
  setSetting('revealed', 'false');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🐾 動物迷因攝影大賽 → http://localhost:${PORT}`);
  console.log(`🔑 管理密碼: ${ADMIN_PASSWORD}`);
  console.log(`⚖️  評審密碼: ${JUDGE_PASSWORD}`);
});
