const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false });
});

app.get('/api/checklist', (_req, res) => {
  res.json({ items: ['item1', 'item2'] });
});

module.exports = app;
