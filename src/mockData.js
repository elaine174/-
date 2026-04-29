// ─── 30 位假員工 ───────────────────────────────────────────────
export const employees = [
  { id: 1,  name: '王建宏', dept: '工程部', avatar: '⚡', role: '前端工程師' },
  { id: 2,  name: '李俊傑', dept: '工程部', avatar: '🔧', role: '後端工程師' },
  { id: 3,  name: '劉宇翔', dept: '工程部', avatar: '💻', role: '全端工程師' },
  { id: 4,  name: '陳柏翰', dept: '工程部', avatar: '🚀', role: 'DevOps' },
  { id: 5,  name: '林家豪', dept: '工程部', avatar: '🛡️', role: '資安工程師' },
  { id: 6,  name: '張哲銘', dept: '工程部', avatar: '🤖', role: 'AI工程師' },
  { id: 7,  name: '林小雨', dept: '設計部', avatar: '🌈', role: 'UI設計師' },
  { id: 8,  name: '陳美琪', dept: '設計部', avatar: '🎨', role: 'UX設計師' },
  { id: 9,  name: '吳欣怡', dept: '設計部', avatar: '✨', role: '視覺設計師' },
  { id: 10, name: '黃雅婷', dept: '設計部', avatar: '🌸', role: '動態設計師' },
  { id: 11, name: '蔡依晨', dept: '設計部', avatar: '💫', role: '品牌設計師' },
  { id: 12, name: '吳雅婷', dept: '產品部', avatar: '📋', role: '產品經理' },
  { id: 13, name: '曾依琳', dept: '產品部', avatar: '🎯', role: '產品策略師' },
  { id: 14, name: '許佳蓉', dept: '產品部', avatar: '🔍', role: '需求分析師' },
  { id: 15, name: '鄭欣妤', dept: '產品部', avatar: '🌟', role: '產品設計師' },
  { id: 16, name: '楊雯婷', dept: '行銷部', avatar: '📣', role: '行銷經理' },
  { id: 17, name: '賴思涵', dept: '行銷部', avatar: '🦋', role: '內容策略師' },
  { id: 18, name: '謝芸佳', dept: '行銷部', avatar: '🎪', role: '社群媒體' },
  { id: 19, name: '方宜蓁', dept: '行銷部', avatar: '📱', role: '數位行銷師' },
  { id: 20, name: '周家豪', dept: '人資部', avatar: '🌺', role: 'HR經理' },
  { id: 21, name: '施怡如', dept: '人資部', avatar: '💝', role: '人才招募' },
  { id: 22, name: '莊雅惠', dept: '人資部', avatar: '🌻', role: '員工關係' },
  { id: 23, name: '徐嘉明', dept: '財務部', avatar: '💰', role: '財務長' },
  { id: 24, name: '洪偉誠', dept: '財務部', avatar: '📊', role: '財務分析師' },
  { id: 25, name: '盧冠廷', dept: '財務部', avatar: '🏦', role: '會計師' },
  { id: 26, name: '邱承翰', dept: '業務部', avatar: '🤝', role: '業務總監' },
  { id: 27, name: '林冠宇', dept: '業務部', avatar: '💼', role: '資深業務' },
  { id: 28, name: '劉宏偉', dept: '業務部', avatar: '🌍', role: '海外業務' },
  { id: 29, name: '郭欣怡', dept: '客服部', avatar: '😊', role: '客服主任' },
  { id: 30, name: '江美玲', dept: '客服部', avatar: '💬', role: '客服專員' },
];

// ─── 題目類型 ──────────────────────────────────────────────────
export const questionTypes = {
  leadership:   { label: '領導力',  icon: '👑', personalityKey: 'dragon_captain' },
  creativity:   { label: '創意力',  icon: '💡', personalityKey: 'creative_zongzi' },
  warmth:       { label: '暖心度',  icon: '🌿', personalityKey: 'warm_wormwood' },
  action:       { label: '行動力',  icon: '⚡', personalityKey: 'action_warrior' },
  friendliness: { label: '親和力',  icon: '☀️', personalityKey: 'sunshine_angel' },
  reliability:  { label: '可靠感',  icon: '🏔️', personalityKey: 'wise_guardian' },
  energy:       { label: '活力感',  icon: '🔥', personalityKey: 'action_warrior' },
  wisdom:       { label: '智慧感',  icon: '🧠', personalityKey: 'wise_guardian' },
  tolerance:    { label: '包容力',  icon: '🌊', personalityKey: 'warm_wormwood' },
  chemistry:    { label: '默契感',  icon: '✨', personalityKey: 'mystery_mage' },
  positivity:   { label: '正能量',  icon: '🌈', personalityKey: 'sunshine_angel' },
  mystery:      { label: '神秘感',  icon: '🌙', personalityKey: 'mystery_mage' },
};

// ─── 12 道題目 ─────────────────────────────────────────────────
export const questions = [
  {
    id: 1,
    text: '誰最像龍舟隊長，總能帶領大家往前衝？',
    type: 'leadership',
    feedback: '選得好！這位同事果然散發著領袖的光芒 👑',
    options: [1, 12, 26],
  },
  {
    id: 2,
    text: '誰的點子最天馬行空，像特殊口味的創意粽子？',
    type: 'creativity',
    feedback: '創意相惜！你的審美品味一流 ✨',
    options: [7, 6, 13],
  },
  {
    id: 3,
    text: '誰最像艾草，讓人心情一下子清爽舒適？',
    type: 'warmth',
    feedback: '這份溫暖，被你發現了！🌿',
    options: [20, 29, 9],
  },
  {
    id: 4,
    text: '誰最雷厲風行，說到做到從不拖拉？',
    type: 'action',
    feedback: '眼光精準！行動力就是最強的武器 🚀',
    options: [4, 16, 27],
  },
  {
    id: 5,
    text: '誰的笑容最有感染力，一笑就讓人開心起來？',
    type: 'friendliness',
    feedback: '你也是個充滿陽光的人，才能找到陽光 ☀️',
    options: [10, 21, 30],
  },
  {
    id: 6,
    text: '遇到困難時，你最先想衝去找哪位同事求援？',
    type: 'reliability',
    feedback: '可靠的夥伴，是最寶貴的財富！🏔️',
    options: [2, 23, 14],
  },
  {
    id: 7,
    text: '誰最能炒熱氣氛，一到就讓整個辦公室活了起來？',
    type: 'energy',
    feedback: '活力滿點！你眼光真的沒在客氣 🔥',
    options: [18, 5, 28],
  },
  {
    id: 8,
    text: '誰給的建議最有份量，聽完總讓你恍然大悟？',
    type: 'wisdom',
    feedback: '智慧相逢！你也是個善於傾聽的人 🧠',
    options: [3, 24, 15],
  },
  {
    id: 9,
    text: '誰最能包容不同意見，從不輕易評斷別人？',
    type: 'tolerance',
    feedback: '包容的力量，你看見了！🌊',
    options: [22, 8, 19],
  },
  {
    id: 10,
    text: '誰最懂你的梗，一個眼神就能對到頻率？',
    type: 'chemistry',
    feedback: '靈魂共振！默契這種東西真的存在 💫',
    options: [11, 17, 25],
  },
  {
    id: 11,
    text: '誰總是帶給你好心情，就算週一上班都覺得還好？',
    type: 'positivity',
    feedback: '正能量探測器啟動！你選的人太對了 🌈',
    options: [30, 9, 20],
  },
  {
    id: 12,
    text: '誰最讓你好奇，感覺還有很多面向你沒發現？',
    type: 'mystery',
    feedback: '你的直覺很準！神秘感就是最大的魅力 🌙',
    options: [7, 3, 26],
  },
];

// ─── 員工人格卡（依收到最多票的題目類型決定）──────────────────
export const personalityCards = {
  dragon_captain: {
    title: '龍舟隊長',
    emoji: '🏆',
    tagline: '天生的引領者，勇往直前',
    description: '無論遭遇多少逆風，你永遠是那個率先舉起船槳的人。你的存在讓團隊有了方向感，是大家心目中最堅實的依靠。',
    gradientFrom: '#C9A84C',
    gradientTo: '#E8D48A',
    textColor: '#5C3D11',
    badge: '🥇 領袖人格',
  },
  creative_zongzi: {
    title: '創意粽子',
    emoji: '💡',
    tagline: '充滿奇思妙想，點亮不可能',
    description: '你的腦袋就像特製口味的粽子，永遠讓人意想不到。每當大家陷入瓶頸，你的一個想法就能打開全新的可能性。',
    gradientFrom: '#7C3AED',
    gradientTo: '#A78BFA',
    textColor: '#3B0764',
    badge: '🎨 創意人格',
  },
  warm_wormwood: {
    title: '暖心艾草',
    emoji: '🌿',
    tagline: '溫柔包容，是大家的心靈港灣',
    description: '你像端午的艾草，帶著一股淡淡的清香，讓身邊的人自然放鬆下來。你的包容與溫暖，是整個團隊最柔軟的力量。',
    gradientFrom: '#2D5A3D',
    gradientTo: '#3A7A54',
    textColor: '#FFFFFF',
    badge: '🌿 暖心人格',
  },
  action_warrior: {
    title: '行動戰士',
    emoji: '⚡',
    tagline: '說到做到，行動就是答案',
    description: '你是辦公室裡最快把想法變成現實的人。別人還在猶豫時，你已經完成第一步。這種行動力讓大家都深深佩服。',
    gradientFrom: '#D97706',
    gradientTo: '#F59E0B',
    textColor: '#451A03',
    badge: '⚡ 行動人格',
  },
  sunshine_angel: {
    title: '陽光天使',
    emoji: '☀️',
    tagline: '正能量爆棚，照亮每個角落',
    description: '你就是辦公室的小太陽！不管天氣多差、週一多難熬，你的出現就是最好的解藥。你的笑容讓大家都覺得今天也值得期待。',
    gradientFrom: '#F59E0B',
    gradientTo: '#FCD34D',
    textColor: '#451A03',
    badge: '☀️ 陽光人格',
  },
  wise_guardian: {
    title: '智慧守護者',
    emoji: '🧠',
    tagline: '沉穩可靠，是團隊的定海神針',
    description: '你有著超越年齡的沉穩與智慧。每當團隊迷失方向，你那精準的洞察力和可靠的判斷力，都能讓大家找回安全感。',
    gradientFrom: '#1E40AF',
    gradientTo: '#3B82F6',
    textColor: '#FFFFFF',
    badge: '🧠 智慧人格',
  },
  mystery_mage: {
    title: '神秘魔法師',
    emoji: '✨',
    tagline: '低調藏鋒，深不可測',
    description: '你就像粽子最深處的那層餡料，越了解越驚喜。你的默契感和獨特魅力，讓每次與你互動都充滿發現的驚喜。',
    gradientFrom: '#374151',
    gradientTo: '#6B7280',
    textColor: '#FFFFFF',
    badge: '✨ 神秘人格',
  },
};

// ─── 玩家人格卡（依投票傾向決定）────────────────────────────────
export const playerPersonalities = {
  dragon_captain: {
    title: '伯樂千里眼',
    emoji: '👑',
    tagline: '你天生能辨識領袖氣質',
    description: '你對「誰是真正的核心人物」有著超強直覺。這種眼光說明你內心也藏著強烈的使命感，只待機會爆發！',
    color: '#C9A84C',
  },
  creative_zongzi: {
    title: '創意靈魂雷達',
    emoji: '💡',
    tagline: '你骨子裡充滿創造力',
    description: '你特別能感應到身邊最有創意的靈魂。這代表你自己也是個思維活躍、不走尋常路的奇特存在！',
    color: '#7C3AED',
  },
  warm_wormwood: {
    title: '暖意探測器',
    emoji: '🌿',
    tagline: '你的心最細膩溫柔',
    description: '你特別能感受到他人散發的溫暖與包容。這份細膩說明你是個善解人意的人，懂得珍視每一份真誠的情誼。',
    color: '#2D5A3D',
  },
  action_warrior: {
    title: '行動力偵測站',
    emoji: '⚡',
    tagline: '你欣賞的都是勇往直前的勇士',
    description: '你最欣賞說到做到的人。這代表你自己也是個充滿活力、不喜歡停滯的前進型人物，行動是你最熟悉的語言！',
    color: '#D97706',
  },
  sunshine_angel: {
    title: '陽光收集者',
    emoji: '☀️',
    tagline: '正能量是你最強的感應頻率',
    description: '你總是被最陽光、最有活力的人所吸引。這說明你本身就是辦公室裡那道最溫暖的光，讓大家都快樂的存在！',
    color: '#F59E0B',
  },
  wise_guardian: {
    title: '智慧鑑賞家',
    emoji: '🧠',
    tagline: '你懂得欣賞沉穩與智慧',
    description: '你特別能感知誰才是值得信賴的智者。這份鑑賞力說明你自己就是個成熟穩重、善於判斷的重要夥伴。',
    color: '#1E40AF',
  },
  mystery_mage: {
    title: '神秘頻率接收器',
    emoji: '✨',
    tagline: '你對隱藏的魅力特別有感',
    description: '你對那些充滿神秘感和默契的人特別感興趣。你是個有深度的觀察者，總能發現別人視而不見的閃光點！',
    color: '#374151',
  },
};

// ─── 模擬公司全員票數（假資料，用於統計頁）──────────────────────
export const simulatedVotes = {
  1:  { leadership: 7, action: 2 },
  2:  { reliability: 8, wisdom: 1 },
  3:  { wisdom: 5, mystery: 3 },
  4:  { action: 9 },
  5:  { energy: 6, action: 2 },
  6:  { creativity: 8, mystery: 2 },
  7:  { creativity: 10, mystery: 1 },
  8:  { tolerance: 7, warmth: 3 },
  9:  { warmth: 9, friendliness: 2 },
  10: { friendliness: 8 },
  11: { chemistry: 7, mystery: 2 },
  12: { leadership: 6, creativity: 3 },
  13: { creativity: 5, wisdom: 4 },
  14: { reliability: 9 },
  15: { wisdom: 8, reliability: 1 },
  16: { action: 7, leadership: 2 },
  17: { chemistry: 6, creativity: 2 },
  18: { energy: 8, positivity: 2 },
  19: { tolerance: 5, warmth: 3 },
  20: { warmth: 7, tolerance: 2 },
  21: { friendliness: 6, positivity: 3 },
  22: { tolerance: 8, warmth: 1 },
  23: { reliability: 5, wisdom: 4 },
  24: { wisdom: 6, reliability: 3 },
  25: { chemistry: 9 },
  26: { leadership: 9, action: 1 },
  27: { action: 6, leadership: 3 },
  28: { energy: 7, action: 2 },
  29: { warmth: 8, friendliness: 2 },
  30: { friendliness: 7, positivity: 3 },
};

// ─── 工具函式 ──────────────────────────────────────────────────

/** 取得員工資料 */
export const getEmployee = (id) => employees.find((e) => e.id === id);

/** 合併玩家投票與模擬公司票數 */
export const mergeVotes = (playerAnswers) => {
  const merged = {};
  Object.entries(simulatedVotes).forEach(([id, types]) => {
    merged[Number(id)] = { ...types };
  });
  playerAnswers.forEach(({ employeeId, questionType }) => {
    if (!merged[employeeId]) merged[employeeId] = {};
    merged[employeeId][questionType] = (merged[employeeId][questionType] || 0) + 1;
  });
  return merged;
};

/** 依票數判斷員工人格類型 */
export const getEmployeePersonality = (voteMap) => {
  const typeTotals = {};
  Object.entries(voteMap).forEach(([type, count]) => {
    const key = questionTypes[type]?.personalityKey;
    if (key) typeTotals[key] = (typeTotals[key] || 0) + count;
  });
  if (Object.keys(typeTotals).length === 0) return personalityCards.warm_wormwood;
  const topKey = Object.entries(typeTotals).sort((a, b) => b[1] - a[1])[0][0];
  return personalityCards[topKey] || personalityCards.warm_wormwood;
};

/** 計算玩家人格（依投票傾向） */
export const getPlayerPersonality = (answers) => {
  const typeCounts = {};
  answers.forEach(({ questionType }) => {
    const key = questionTypes[questionType]?.personalityKey;
    if (key) typeCounts[key] = (typeCounts[key] || 0) + 1;
  });
  if (Object.keys(typeCounts).length === 0) return playerPersonalities.warm_wormwood;
  const topKey = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];
  return playerPersonalities[topKey] || playerPersonalities.warm_wormwood;
};

/** 取得票數總和 */
export const getTotalVotes = (voteMap) =>
  Object.values(voteMap).reduce((s, n) => s + n, 0);
