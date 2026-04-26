'use strict';
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zoo2024';
const JUDGE_PASSWORD = process.env.JUDGE_PASSWORD || 'judge2024';
const DATA_FILE = 'data.json';

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch {
    return {
      photos: [],
      awards: [
        { id: '1', name: '最佳厭世獎', judge_name: '柏翰輔導會長', winner_photo_id: null, order: 0 },
        { id: '2', name: '最像人類獎', judge_name: '育誠會長', winner_photo_id: null, order: 1 },
      ],
      revealed: false
    };
  }
}

let db = loadData();
function save() { fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2)); }

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
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
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/api/status', (req, res) => {
  res.json({ revealed: db.revealed, photo_count: db.photos.length });
});

app.post('/api/submit', upload.single('photo'), (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    if (!name) return res.status(400).json({ error: '請填寫您的姓名' });
    if (!req.file) return res.status(400).json({ error: '請上傳一張照片' });
    const photo = { id: crypto.randomUUID(), display_id: db.photos.length + 1, name, filename: req.file.filename, created_at: new Date().toISOString() };
    db.photos.push(photo);
    save();
    res.json({ success: true, display_id: photo.display_id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/photos', (req, res) => {
  res.json({ photos: db.photos.map(p => ({ id: p.id, display_id: p.display_id, filename: p.filename })) });
});

app.get('/api/awards', (req, res) => {
  const awards = db.awards.map(a => {
    const w = a.winner_photo_id ? db.photos.find(p => p.id === a.winner_photo_id) : null;
    return { id: a.id, name: a.name, judge_name: a.judge_name, winner_photo_id: a.winner_photo_id,
      winner_filename: w?.filename ?? null, winner_display_id: w?.display_id ?? null,
      ...(db.revealed && w ? { winner_name: w.name } : {}) };
  });
  res.json({ awards, revealed: db.revealed });
});

app.get('/api/judge/awards', (req, res) => {
  if (req.query.password !== JUDGE_PASSWORD) return res.status(401).json({ error: '評審密碼錯誤' });
  res.json({ awards: db.awards.map(a => { const w = a.winner_photo_id ? db.photos.find(p => p.id === a.winner_photo_id) : null; return { id: a.id, name: a.name, judge_name: a.judge_name, winner_photo_id: a.winner_photo_id, winner_display_id: w?.display_id ?? null }; }) });
});

app.post('/api/judge/pick', (req, res) => {
  const { award_id, photo_id, password } = req.body;
  if (password !== JUDGE_PASSWORD) return res.status(401).json({ error: '評審密碼錯誤' });
  const award = db.awards.find(a => a.id === award_id);
  if (!award) return res.status(400).json({ error: '找不到此獎項' });
  if (!db.photos.find(p => p.id === photo_id)) return res.status(400).json({ error: '找不到此照片' });
  award.winner_photo_id = photo_id;
  save();
  res.json({ success: true });
});

function adminOnly(req, res) {
  const pw = req.body?.password ?? req.query?.password;
  if (pw !== ADMIN_PASSWORD) { res.status(401).json({ error: '密碼錯誤' }); return false; }
  return true;
}

app.post('/api/admin/reveal', (req, res) => { if (!adminOnly(req, res)) return; db.revealed = true; save(); res.json({ success: true }); });
app.post('/api/admin/hide', (req, res) => { if (!adminOnly(req, res)) return; db.revealed = false; save(); res.json({ success: true }); });

app.post('/api/admin/award/add', (req, res) => {
  if (!adminOnly(req, res)) return;
  const { name, judge_name } = req.body;
  if (!name || !judge_name) return res.status(400).json({ error: '請填寫獎項名稱和評審姓名' });
  db.awards.push({ id: crypto.randomUUID(), name: name.trim(), judge_name: judge_name.trim(), winner_photo_id: null, order: db.awards.length });
  save(); res.json({ success: true });
});

app.post('/api/admin/award/delete', (req, res) => {
  if (!adminOnly(req, res)) return;
  db.awards = db.awards.filter(a => a.id !== req.body.award_id);
  save(); res.json({ success: true });
});

app.get('/api/admin/submissions', (req, res) => {
  if (!adminOnly(req, res)) return;
  res.json({ photos: db.photos });
});

app.post('/api/admin/reset', (req, res) => {
  if (!adminOnly(req, res)) return;
  db.photos = []; db.awards.forEach(a => a.winner_photo_id = null); db.revealed = false;
  save(); res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🐾 動物迷因攝影大賽 → http://localhost:${PORT}`);
  console.log(`🔑 管理密碼: ${ADMIN_PASSWORD}`);
  console.log(`⚖️  評審密碼: ${JUDGE_PASSWORD}`);
});
