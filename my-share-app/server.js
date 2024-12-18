const express = require('express');
const path = require('path');

const app = express();
const PORT = 3015; // 원하는 포트 번호로 변경 가능

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트 (메인 페이지)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작 (0.0.0.0으로 수정하여 외부에서도 접근 가능)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
