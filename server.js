const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// 이미지 경로 매핑 (필수)
app.use('/photos', (req, res) => {
    const decodedPath = decodeURIComponent(req.url);
    const targetPath = path.join('C:', 'Users', 'tahar', 'clawd', 'academy_marketing', decodedPath);
    if (fs.existsSync(targetPath)) {
        res.sendFile(targetPath);
    } else {
        res.status(404).send('Not Found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
