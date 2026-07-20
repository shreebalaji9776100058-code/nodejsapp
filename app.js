const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic hello-world route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Hostinger Node App</title></head>
    <body>
      <h1>Hello World! 👋</h1>
      <p>Your Node.js app is successfully running on Hostinger.</p>
    </body>
    </html>
  `);
});

// Test DB connection
app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Example: fetch rows from a table
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users LIMIT 50');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: insert a row
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.json({ insertedId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: fetch external data with axios
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: export data to Excel with SheetJS
app.get('/export-excel', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users LIMIT 100');
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
