const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');

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

// Example: fetch data from an external API with axios
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: generate an Excel file with SheetJS and send it for download
app.get('/export-excel', (req, res) => {
  const data = [
    { Name: 'Alice', Age: 30 },
    { Name: 'Bob', Age: 25 }
  ];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
