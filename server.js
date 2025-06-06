const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8967;
const EDIT_DIR = path.join(__dirname, 'edits');

if (!fs.existsSync(EDIT_DIR)) {
  fs.mkdirSync(EDIT_DIR);
}

app.use(express.json());
app.use(express.static(__dirname));

// Get saved snippet for a page
app.get('/api/edits/:page', (req, res) => {
  const file = path.join(EDIT_DIR, req.params.page + '.html');
  if (fs.existsSync(file)) {
    res.type('text/html').send(fs.readFileSync(file, 'utf8'));
  } else {
    res.type('text/html').send('');
  }
});

// Save snippet for a page
app.post('/api/edits/:page', (req, res) => {
  const file = path.join(EDIT_DIR, req.params.page + '.html');
  fs.writeFileSync(file, req.body.content || '');
  res.json({status: 'saved'});
});

// Delete snippet for a page
app.delete('/api/edits/:page', (req, res) => {
  const file = path.join(EDIT_DIR, req.params.page + '.html');
  if (fs.existsSync(file)) fs.unlinkSync(file);
  res.json({status: 'deleted'});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
