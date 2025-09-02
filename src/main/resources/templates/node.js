const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Serve your HTML/CSS/JS

// In-memory database (use real DB in production)
const db = {
    users: {},
    passwords: {}
};

// Encryption functions
function encrypt(text, key) {
    // Simple encryption - use proper encryption in production
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(text, key) {
    // Simple decryption
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// API Routes
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (db.users[username]) {
        return res.status(400).json({ error: 'Username exists' });
    }
    db.users[username] = password;
    db.passwords[username] = [];
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (db.users[username] === password) {
        return res.json({ success: true });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/passwords', (req, res) => {
    const { username, masterPassword, account } = req.body;
    // Verify user first
    // Then encrypt and store password
    const encrypted = encrypt(account.password, masterPassword);
    db.passwords[username].push({
        account: account.name,
        username: account.username,
        password: encrypted
    });
    res.json({ success: true });
});

app.get('/api/passwords', (req, res) => {
    const { username, masterPassword } = req.query;
    // Verify user first
    const encryptedPasswords = db.passwords[username] || [];
    const decrypted = encryptedPasswords.map(pw => ({
        ...pw,
        password: decrypt(pw.password, masterPassword)
    }));
    res.json(decrypted);
});

app.listen(3000, () => console.log('Server running on port 3000'));