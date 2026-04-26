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
  CREATE TABLE IF NOT EXISTS votes (
    voter_id TEXT PRIMARY KEY,
    photo_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

if (!_get.get('voting_open')) setSetting('voting_open', 'false');
if (!_get.get('revealed')) setSetting('revealed', 'false');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${uuidv4().slice(0, 8)}${ext}`);
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

app.use((req, res, next) => {
  if (!req.cookies.vid) {
    const id = uuidv4();
    res.cookie('vid', id, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
    req.vid = id;
  } else {
    req.vid = req.cookies.vid;
  }
  next();
});

app.get('/api/status', (req, res) => {
  res.json({
    voting_open: getSetting('voting_open') === 'true',
    revealed: getSetting('revealed') === 'true',
    has_voted: !!db.prepare('SELECT 1 FROM votes WHERE voter_id = ?').get(req.vid),
    photo_count: db.prepare('SELECT COUNT(*) as c FROM photos').get().c,
    vote_count: db.prepare('SELECT COUNT(*) as c FROM votes').get().c,
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/photos', (req, res) => {
  const revealed = getSetting('revealed') === 'true';
  const photos = db.prepare(`
    SELECT p.id, p.display_id, p.filename ${revealed ? ', p.name' : ''},
           COUNT(v.photo_id) as votes
    FROM photos p
    LEFT JOIN votes v ON v.photo_id = p.id
    GROUP BY p.id
    ORDER BY ${revealed ? 'votes DESC, p.display_id' : 'p.display_id'}
  `).all();
  const my_vote = db.prepare('SELECT photo_id FROM votes WHERE voter_id = ?').get(req.vid);
  res.json({ photos, revealed, my_vote: my_vote?.photo_id ?? null });
});

app.post('/api/vote', (req, res) => {
  if (getSetting('voting_open') !== 'true')
    return res.status(400).json({ error: '目前未開放投票' });
  if (db.prepare('SELECT 1 FROM votes WHERE voter_id = ?').get(req.vid))
    return res.status(400).json({ error: '你已經投過票了！每人只能投一票' });
  if (!db.prepare('SELECT 1 FROM photos WHERE id = ?').get(req.body.photo_id))
    return res.status(400).json({ error: '找不到此照片' });
  db.prepare('INSERT INTO votes (voter_id, photo_id) VALUES (?, ?)').run(req.vid, req.body.photo_id);
  res.json({ success: true });
});

function adminOnly(req, res) {
  const pw = req.body?.password ?? req.query?.password;
  if (pw !== ADMIN_PASSWORD) { res.status(401).json({ error: '密碼錯誤' }); return false; }
  return true;
}

app.post('/api/admin/toggle-voting', (req, res) => {
  if (!adminOnly(req, res)) return;
  const next = getSetting('voting_open') !== 'true';
  setSetting('voting_open', next);
  res.json({ voting_open: next });
});

app.post('/api/admin/reveal', (req, res) => {
  if (!adminOnly(req, res)) return;
  setSetting('voting_open', 'false');
  setSetting('revealed', 'true');
  res.json({ success: true });
});

app.post('/api/admin/hide', (req, res) => {
  if (!adminOnly(req, res)) return;
  setSetting('revealed', 'false');
  res.json({ success: true });
});

app.get('/api/admin/submissions', (req, res) => {
  if (!adminOnly(req, res)) return;
  res.json({
    photos: db.prepare(`
      SELECT p.id, p.display_id, p.name, p.filename, p.created_at,
             COUNT(v.photo_id) as votes
      FROM photos p LEFT JOIN votes v ON v.photo_id = p.id
      GROUP BY p.id ORDER BY votes DESC, p.display_id
    `).all()
  });
});

app.post('/api/admin/reset', (req, res) => {
  if (!adminOnly(req, res)) return;
  db.exec('DELETE FROM votes; DELETE FROM photos;');
  setSetting('voting_open', 'false');
  setSetting('revealed', 'false');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🐾 動物迷因攝影大賽 → http://localhost:${PORT}`);
  console.log(`🔑 管理密碼: ${ADMIN_PASSWORD}`);
});
