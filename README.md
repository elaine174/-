# 🐾 新北動物迷因攝影大賽

JCI 新北國際青年商會活動投票系統。

## 功能
- 📸 **投稿**：參賽者上傳動物照片 + 填寫姓名
- 🗳️ **投票**：匿名顯示所有照片（不顯示姓名），每人投一票
- 🏆 **結果**：主辦人揭曉後才顯示姓名和得票排名
- 🔧 **管理後台**：控制投票開關、揭曉結果

## 部署步驟（Railway.app）

1. 登入 [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. 選擇 `elaine174/-` 這個 repo
4. 選擇分支 `claude/animal-photo-contest-site-ZBYRm`
5. Settings → Variables → 新增：
   - `ADMIN_PASSWORD` = 你要的密碼（不設定則預設為 `zoo2024`）
6. 複製部署網址分給大家！

## 活動流程

1. 大家在動物園拍照後，進入網站投稿
2. 主辦人到 `/admin.html` 點擊「開始投票」
3. 大家到 `/vote.html` 看匿名照片並投票
4. 主辦人點擊「揭曉結果」
5. `/results.html` 顯示得票排名與照片主人🎉
